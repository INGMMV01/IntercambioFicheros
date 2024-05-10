import { Component, Input } from '@angular/core';

@Component({
    selector: 'abanca-cargando',
    templateUrl: './cargando.component.html',
    styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent {

    @Input() valorLoading!: boolean;
    constructor() { }

}
