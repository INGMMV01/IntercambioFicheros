import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IFiltros } from 'src/app/models/propiedad-peticion/Filtros';
import { filtrosTitulos } from 'src/app/models/propiedad-peticion/filtrosTitulos';
import { EstadoBusquedaPropiedadesPeticionService } from 'src/app/services/propiedad-peticion/estado-busqueda-propiedades-peticion.service';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';
import { FiltroPropiedadesPeticionService } from 'src/app/services/propiedad-peticion/filtro-propiedades-peticion.service';
import { LayoutMedidasService } from 'src/app/services/propiedad-peticion/layout-medidas.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IPropiedadPeticionResponse } from 'src/app/models/RPOS415/PropiedadPeticionResponse';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';
import { IPropiedadPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPutRequestAttributes';
import { mapResponseToPutRequest } from 'src/app/models/mappers/propiedad-peticion-mappers';
import { GenericDataService } from 'src/app/services/generic-data.service';
import { IPropiedadPeticionPostRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPostRequestAttributes';

@Component({
    selector: 'abanca-filtro',
    templateUrl: './filtro.component.html',
    styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements AfterViewInit, OnInit {

    @ViewChild('filtroForm') filtroForm: ElementRef | undefined;
    @ViewChild('myPanel') myPanel: MatExpansionPanel | undefined;
    @Output() referringChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    panelOpenState = false;
    formGroup: FormGroup;
    filtros: IFiltros;
    filledFilters: { key: keyof IFiltros; text: string }[] = [];
    filledFilters$: BehaviorSubject<{ key: keyof IFiltros; text: string }[]> =
        new BehaviorSubject<{ key: keyof IFiltros; text: string }[]>([]);
    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];

    constructor(private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private propiedadPeticionService: PropiedadPeticionService,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        public estadoBusquedaService: EstadoBusquedaPropiedadesPeticionService,
        public filtroService: FiltroPropiedadesPeticionService,
        private layoutMedidasService: LayoutMedidasService) {
        this.filtros = this.filtroService.getFiltros();
        this.formGroup = this.agregarControlesFiltro();

        this.propiedadPeticionService.get$(this.idPeticion).subscribe(respuesta => {

            // Test
            const objetoAActualizar = respuesta.find(item => item.attributes.clave === 'Rutas Pendientes');
            if (objetoAActualizar) {
                let putRequestAttributes = mapResponseToPutRequest(objetoAActualizar.attributes, this.idPeticion);
                putRequestAttributes.valor = 'Ruta modificada';
                this.propiedadPeticionService.update$(this.idPeticion, objetoAActualizar.id, putRequestAttributes).subscribe(
                    response => {
                        console.log('Entity updated:', response);
                    },
                    error => {
                        console.error('Error:', error);
                    }
                );
            }

            this.applyFilter();
        });

        this.panelOpenState = this.estadoBusquedaService.panelOpenState;
        iconRegistry.addSvgIcon(
            'filter-remove',
            sanitizer.bypassSecurityTrustResourceUrl('https://cdn.abanca.io/assets/icons/material/filter-remove.svg')
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.updateTableScrollHeight();
    }

    togglePanel() {
        if (this.myPanel) {
            this.myPanel.toggle();
        }
    }

    onPanelOpened(): void {
        this.panelOpenState = true;
        this.estadoBusquedaService.panelOpenState = this.panelOpenState;
        setTimeout(() => this.updateTableScrollHeight(), 300);
    }

    onPanelClosed(): void {
        this.panelOpenState = false;
        this.estadoBusquedaService.panelOpenState = this.panelOpenState;
        setTimeout(() => this.updateTableScrollHeight(), 300);
    }

    ngAfterViewInit() {
        this.updateTableScrollHeight();
    }

    ngOnInit(): void {

        // Leer el parámetro referrer que contiene la url de referencia.
        this.activatedRoute.queryParams.subscribe(params => {
            this.estadoBusquedaService.referrer = params['referrer'];
        });

        setTimeout(() => {
            if (this.myPanel && this.panelOpenState) {
                this.myPanel.open();
            }
        }, 300);
    }

    updateTableScrollHeight(): void {
        if (this.filtroForm) {
            const height = this.filtroForm.nativeElement.offsetHeight;
            this.layoutMedidasService.setFiltroForm(height);
        }
    }

    public volverAtras() {
        if (this.estadoBusquedaService.referrer) {
            this.referringChange.emit(true);
            window.location.href = this.estadoBusquedaService.referrer;
        }
    }

    public applyFilter(): void {
        this.filtros = {
            clave: this.formGroup.get('clave')?.value,
            nombre: this.formGroup.get('nombre')?.value,
            valor: this.formGroup.get('valor')?.value,
            fechaDeModificacion: this.formGroup.get('fechaDeModificacion')?.value
        };
        this.guardarEstadoFiltroEnBusqueda();
        this.filtroService.setFiltros(this.filtros);
        this.obtenerFiltrosAplicados();
        setTimeout(() => this.updateTableScrollHeight(), 300);
    }

    public guardarEstadoFiltroEnBusqueda(): void {
        this.estadoBusquedaService.clave = this.filtros.clave;
        this.estadoBusquedaService.nombre = this.filtros.nombre;
        this.estadoBusquedaService.valor = this.filtros.valor;
        this.estadoBusquedaService.fechaDeModificacion = this.filtros.fechaDeModificacion;
        this.estadoBusquedaService.panelOpenState = this.panelOpenState;
    }



    public limpiarFiltros(): void {
        this.formGroup.reset();
        this.applyFilter();
    }

    obtenerFiltrosAplicados(): void {
        const filtrosForm = this.formGroup.value;
        const updatedFilters = Object.keys(filtrosForm)
            .filter(key => filtrosForm[key] !== null && filtrosForm[key] !== '')
            .map(key => ({
                key: key as keyof IFiltros,
                text: `${filtrosTitulos[key as keyof IFiltros]}: ${filtrosForm[key]}`
            }));
        this.filledFilters$.next(updatedFilters);
    }

    public onCloseFilter(filterKey: keyof IFiltros): void {
        this.formGroup.get(filterKey)?.reset();
        this.applyFilter();
    }

    trackByFiltros(index: number, filtro: { key: keyof IFiltros; text: string }): keyof IFiltros {
        return filtro.key;
    }

    private agregarControlesFiltro(): FormGroup {
        return this.formBuilder.group({
            clave: [this.filtros.clave],
            nombre: [this.filtros.nombre],
            valor: [this.filtros.valor],
            fechaDeModificacion: [this.filtros.fechaDeModificacion]
        });
    }
}
