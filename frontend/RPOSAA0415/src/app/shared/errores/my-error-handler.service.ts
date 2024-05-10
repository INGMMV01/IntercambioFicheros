import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogData } from './DialogData';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class MyErrorHandlerService implements ErrorHandler {

    data: DialogData;
    existeError = false;

    constructor(public dialog: MatDialog, private zone: NgZone) {
        this.data = {
            titulo: 'Ocurrió un comportamiento inesperado.',
            descripcion: '',
            detalles:  '',
        };
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(
            ErrorDialogComponent,
            { data: this.data }
        );

        dialogRef.beforeClosed().subscribe(_ => {
            window.location.reload();
        });
    }

    handleError(error: Error): void {
        this.zone.run(() => {
            if (this.existeError) {
                return;
            }
            this.existeError = true;
            if (error.name === 'HttpErrorResponse') {
                this.errorHttpErrorResponse(error);
            } else {
                if (error.message) {
                    this.data.descripcion = error.message;
                }
                if (error.stack) {
                    this.data.detalles = error.stack;
                }
            }
            console.log(error.message);
            this.openDialog();
        });
    }

    errorHttpErrorResponse(error: Error): void {
        const errorConcreto = error as HttpErrorResponse;
        if (errorConcreto.status === 0) {
            this.data.descripcion = 'No se ha podido establecer comunicación con el servidor.';
        } else if (errorConcreto.status === 401) {
            this.data.titulo = `${errorConcreto.statusText} (${errorConcreto.status})`;
            this.data.descripcion = errorConcreto.error && errorConcreto.error.errors
                ? errorConcreto.error.errors[0].title
                : 'No autorizado.';
        } else {
            this.data.descripcion = 'Se ha producido un error en servidor.';
            if (errorConcreto.error && errorConcreto.error.errors && errorConcreto.error.errors[0].title) {
                this.data.descripcion += `: ${errorConcreto.error.errors[0].title}`;
            } else if (errorConcreto.error && errorConcreto.error.Message) {
                this.data.descripcion += `: ${errorConcreto.error.Message}`;
            } else {
                this.data.descripcion += `: ${error.message}`;
            }
        }
        this.data.detalles = JSON.stringify(errorConcreto, null, 2);
    }
}
