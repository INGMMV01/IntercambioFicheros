import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'abanca-validacion-snackbar',
    templateUrl: './validacion-snackbar.component.html',
    styleUrls: ['./validacion-snackbar.component.scss']
})
export class ValidacionSnackbarComponent {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
