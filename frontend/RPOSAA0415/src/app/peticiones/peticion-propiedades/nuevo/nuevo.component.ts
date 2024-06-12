import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPropiedadPeticionPostRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPostRequestAttributes';
import { PropiedadPeticionService } from 'src/app/services/propiedad-peticion/propiedad-peticion.service';

@Component({
    selector: 'abanca-nuevo',
    templateUrl: './nuevo.component.html',
    styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent {

    formulario: FormGroup;
    idPeticion = this.activatedRoute.snapshot.params['idPeticion'];
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
