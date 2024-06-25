import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IJsonApiData } from '@morphe/common';
import { map, switchMap } from 'rxjs/operators';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes } from 'src/app/models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { IPeticionResponseAttributes } from 'src/app/models/RPOS415/PeticionResponseAttributes';
import { IPropiedadPeticionPostRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPostRequestAttributes';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';
import { EstadoPosibleService } from 'src/app/services/estados/estado-posible.service';
import { PeticionesService } from 'src/app/services/peticion/peticiones.service';
import { PropiedadPeticionEstadoService } from 'src/app/services/propiedad-peticion/propiedad-peticion-estado.service';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';
import { TipoPropiedadPeticionService } from 'src/app/services/propiedad-peticion/tipo-propiedad-peticion.service';

@Component({
    selector: 'abanca-nuevo',
    templateUrl: './nuevo.component.html',
    styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent {

    formulario: FormGroup;
    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];
    esPropiedadEstado = false;
    estados: IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[] = [];
    tiposDePropiedadDePeticion: any = []; // TODO: Cambiar por el valor correcto
    constructor(
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        private peticionesService: PeticionesService,
        private propiedadPeticionService: PropiedadPeticionService,
        private propiedadPeticionEstadoService: PropiedadPeticionEstadoService,
        private tipoPropiedadPeticionService: TipoPropiedadPeticionService,
        private estadoPosibleService: EstadoPosibleService) {

        this.formulario = new FormGroup({
            clave: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
        });

        this.peticionesService.getEntity$(this.idPeticion).pipe(
            switchMap((peticion) => this.estadoPosibleService.get$(peticion.tipoItem)),
            map(estados => estados.sort((a, b) => a.attributes.descripcion.localeCompare(b.attributes.descripcion)))
        ).subscribe(
            (estadosOrdenados) => {
                this.estados = estadosOrdenados;
            }
        );

        this.tipoPropiedadPeticionService.get$().subscribe(
            (tipoPropiedades) => {
                this.tiposDePropiedadDePeticion = tipoPropiedades.sort((a, b) =>
                    a.attributes.descripcion.localeCompare(b.attributes.descripcion));
            }
        );

    }

    public get cargando(): boolean {
        const cargando: boolean = this.propiedadPeticionService.cargando;

        return cargando;
    }

    public get cargandoEstadosPosibles(): boolean {
        const cargando: boolean = this.estadoPosibleService.cargando;

        return cargando;
    }

    changeTipoDePropiedad(valor: string): void {
        if (valor) {
            const propiedadPeticionResponseAttributes = new Object() as IPropiedadPeticionResponseAttributes;
            propiedadPeticionResponseAttributes.clave = valor;
            this.esPropiedadEstado = this.propiedadPeticionEstadoService.esPropiedadEstado(propiedadPeticionResponseAttributes);
        }
    }

    guardar(): void {

        this.formulario.updateValueAndValidity();
        const nuevo: IPropiedadPeticionPostRequestAttributes = new Object() as IPropiedadPeticionPostRequestAttributes;
        nuevo.clave = this.formulario.get('clave')?.value;
        nuevo.nombre = this.formulario.get('nombre')?.value;
        nuevo.valor = this.formulario.get('valor')?.value;

        const value$ = this.propiedadPeticionService.add$(this.idPeticion, nuevo);
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
