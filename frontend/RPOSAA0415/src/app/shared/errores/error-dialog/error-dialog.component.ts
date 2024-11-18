import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../DialogData';

@Component({
    selector: 'abanca-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {

    claseDetalles = 'ocultarDetalles';
    detallesVisibles = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private matDialogRef: MatDialogRef<ErrorDialogComponent>
    ) { }

    aceptar(): void {
        window.location.reload();
    }

    mostrarDetalles(): void {
        this.detallesVisibles = !this.detallesVisibles;
        this.claseDetalles = 'mostrarDetalles';
        this.matDialogRef.componentInstance.detallesVisibles = this.detallesVisibles;
    }

    // copiarAlPortapapeles(): void {
    //     console.log('data.detalles:', this.data.detalles); // Línea depuración
    //     if (typeof this.data.detalles === 'string') {
    //         navigator.clipboard.writeText(this.data.detalles)
    //             .then(() => console.log('Detalles del error copiados al portapapeles'))
    //             .catch(err => console.error('Error al copiar al portapapeles', err));
    //     } else {
    //         console.error('data.detalles no es un string');
    //     }
    // }

    copiarAlPortapapeles(): void {

        let textoParaCopiar: string;

        if (typeof this.data.detalles === 'string') {
            textoParaCopiar = this.data.detalles;
        } else {
            textoParaCopiar = String(this.data.detalles);
        }

        // Crear un elemento textarea temporal
        const textarea = document.createElement('textarea');
        textarea.value = textoParaCopiar;
        document.body.appendChild(textarea);

        // Seleccionar el texto
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Para dispositivos móviles

        // Copiar el texto seleccionado
        try {
            document.execCommand('copy');
            console.log('Texto copiado al portapapeles');
        } catch (err) {
            console.error('Error al copiar al portapapeles', err);
        }

        // Eliminar el textarea temporal
        document.body.removeChild(textarea);
    }



}
