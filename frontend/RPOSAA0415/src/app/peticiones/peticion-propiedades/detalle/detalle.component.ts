import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IJsonApiData } from '@morphe/common';
import { Observable } from 'rxjs';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes } from 'src/app/models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { IPropiedadPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPutRequestAttributes';
import { EstadoPosibleService } from 'src/app/services/estados/estado-posible.service';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';
import { PropiedadesEstadoService } from 'src/app/services/propiedad-peticion/propiedades-estado.service';

@Component({
    selector: 'abanca-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

    formulario: FormGroup;
    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];
    idPropiedad = this.activatedRoute.snapshot.params['idPropiedad'];
    esPropiedadEstado = false;
    tipoItemId = 'DLL'; // TODO: Cambiar por el valor correcto
    estados: IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        private propiedadPeticionService: PropiedadPeticionService,
        private propiedadesEstadoService: PropiedadesEstadoService,
        private estadoPosibleService: EstadoPosibleService) {

        this.formulario = new FormGroup({
            clave: new FormControl('', Validators.required),
            nombre: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
        });

        this.estadoPosibleService.get$(this.tipoItemId).subscribe(
            (estados) => {
                this.estados = estados;
            }
        );

        propiedadPeticionService.getEntity$(this.idPeticion, this.idPropiedad).subscribe((propiedad) => {
            this.esPropiedadEstado = this.propiedadesEstadoService.esPropiedadEstado(propiedad);
            this.formulario.get('clave')?.setValue(propiedad.clave);
            this.formulario.get('nombre')?.setValue(propiedad.nombre);
            this.formulario.get('valor')?.setValue(propiedad.valor);
        });
    }
    public get cargando(): boolean {
        const cargando: boolean = this.propiedadPeticionService.cargando;

        return cargando;
    }

    public get cargandoEstadosPosibles(): boolean {
        const cargando: boolean = this.estadoPosibleService.cargando;

        return cargando;
    }

    guardar(): void {

        this.formulario.updateValueAndValidity();
        const request: IPropiedadPeticionPutRequestAttributes = new Object() as IPropiedadPeticionPutRequestAttributes;
        request.clave = this.formulario.get('clave')?.value;
        request.nombre = this.formulario.get('nombre')?.value;
        request.valor = this.formulario.get('valor')?.value;

        const value$ = this.propiedadPeticionService.update$(this.idPeticion, this.idPropiedad, request);
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        value$.subscribe((respuesta: any) => {
            if (respuesta) {
                this.snackBar.open(`La propiedad de petición '${respuesta.attributes.nombre}' se ha guardado correctamente.`,
                    undefined, { duration: 3000 });
                this.router.navigate(['/', 'peticiones', this.idPeticion, 'propiedades', respuesta.attributes.clave]);
            }
        });
    }

}
