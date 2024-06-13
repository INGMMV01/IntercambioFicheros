import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropiedadPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPutRequestAttributes';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';

@Component({
    selector: 'abanca-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

    formulario: FormGroup;
    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];
    idPropiedad = this.activatedRoute.snapshot.params['idPropiedad'];
    constructor(
        private activatedRoute: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router,
        private propiedadPeticionService: PropiedadPeticionService) {

        this.formulario = new FormGroup({
            clave: new FormControl('', Validators.required),
            nombre: new FormControl('', Validators.required),
            valor: new FormControl('', Validators.required),
        });

        propiedadPeticionService.getEntity$(this.idPeticion, this.idPropiedad).subscribe((propiedad) => {
            this.formulario.get('clave')?.setValue(propiedad.clave);
            this.formulario.get('nombre')?.setValue(propiedad.nombre);
            this.formulario.get('valor')?.setValue(propiedad.valor);
        });
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
