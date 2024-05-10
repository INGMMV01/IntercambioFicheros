/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'abanca-input-code-resolver',
    templateUrl: './input-code-resolver.component.html',
    styleUrls: ['./input-code-resolver.component.scss']
})
export class InputCodeResolverComponent implements AfterViewInit, OnInit {
    @ViewChild('inputField') inputField!: ElementRef;
    @Input() descripcionControlName!: string;
    @Input() codigoControlName!: string;
    @Input() idControlName?: string;
    @Input() label = 'Código';
    @Input() placeholder = 'Código';
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    @Input() service!: any;
    @Input() methodName!: string;
    @Input() properties!: string[];
    @Input() idProperty?: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    @Output() codigoResuelto: EventEmitter<any> = new EventEmitter();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    obtenerFn!: (codigo: string) => Observable<any>;
    cargando = false;

    get parentForm(): FormGroup {
        return this.controlContainer.control as FormGroup;
    }

    get controlNombre(): FormControl {
        const descripcionControl = this.parentForm.get(this.descripcionControlName) as FormControl;
        descripcionControl.disable();

        return descripcionControl;
    }
    get controlCodigo(): FormControl {
        return this.parentForm.get(this.codigoControlName) as FormControl;
    }

    constructor(private controlContainer: ControlContainer, iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer) {
        this.registrarIconos(iconRegistry, sanitizer);
    }

    ngOnInit(): void {
        this.obtenerFn = (codigo: string) => this.service[this.methodName](codigo);
    }

    ngAfterViewInit(): void {
        this.capturarEventos();
    }

    capturarEventos(): void {
        const keyup$ = fromEvent(this.inputField.nativeElement, 'keyup');
        const paste$ = fromEvent(this.inputField.nativeElement, 'paste');

        merge(keyup$, paste$).pipe(
            debounceTime(500),
            map((event: any) => event.target.value),
            switchMap((codigo: string) => this.resolveCode(codigo))
        ).subscribe();
    }

    public resolverCodigo(): Observable<any> {
        const codigo = this.controlCodigo.value;

        return this.resolveCode(codigo);
    }

    private resolveCode(codigo: string): Observable<any> {
        if (!codigo) {
            this.limpiarCampos();

            return of(null);
        }

        this.cargando = true;

        return this.obtenerFn(codigo.trim()).pipe(
            catchError(() => {
                this.parentForm.get(this.descripcionControlName)?.setValue(
                    `El elemento '${codigo}' no existe`);
                this.parentForm.get(this.codigoControlName)?.setErrors({
                    codigo: `El campo '${this.label}' no se ha resuelto correctamente.`
                });

                return of(null);
            }),
            finalize(() => {
                this.cargando = false;
            }),
            tap((respuesta: any) => this.procesarRespuesta(respuesta, codigo))
        );
    }


    private procesarRespuesta(respuesta: any, codigo: string) {
        if (!respuesta) {
            this.codigoResuelto.emit(null);

            return;
        }

        const valor = this.properties.map(prop => respuesta[prop] || '').join(' ');

        if (valor.trim() === ',') {
            this.parentForm.get(this.descripcionControlName)?.setValue(`El elemento '${codigo}' no existe`);
            this.parentForm.get(this.codigoControlName)?.setErrors(
                { codigo: `El campo '${this.label}' no se ha resuelto correctamente.` });
            if (this.idControlName) {
                this.parentForm.get(this.idControlName)?.setValue('');
            }
            this.codigoResuelto.emit(null);
        } else {
            this.parentForm.get(this.descripcionControlName)?.setValue(valor);
            if (this.idProperty && this.idControlName) {
                const identificador = respuesta[this.idProperty];
                this.parentForm.get(this.idControlName)?.setValue(identificador);
            }
            this.codigoResuelto.emit(respuesta);
        }
    }

    private limpiarCampos() {
        this.parentForm.get(this.descripcionControlName)?.setValue('');
        if (this.idControlName) {
            this.parentForm.get(this.idControlName)?.setValue('');
        }
    }


    private registrarIconos(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
        iconRegistry.addSvgIcon(
            'clock',
            sanitizer.bypassSecurityTrustResourceUrl('http://cdn.abanca.io/assets/icons/material/clock.svg')
        );
    }
}
