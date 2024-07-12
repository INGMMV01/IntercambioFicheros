import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';

@Injectable({
    providedIn: 'root'
})
export class EstadoBusquedaPropiedadesPeticionService {
    clave: string;
    nombre: string;
    valor: string;
    fechaDeModificacion?: Date;
    sortDirection: SortDirection;
    sortActive: string;
    pageIndex: number;
    pageSize: number;
    tabIndex: number;
    panelOpenState: boolean;
    referrer: string;

    constructor() {
        this.clave = '';
        this.nombre = '';
        this.valor = '';
        this.fechaDeModificacion = undefined;
        this.sortDirection = '';
        this.sortActive = '';
        this.pageIndex = 0;
        this.pageSize = 100;
        this.tabIndex = 0;
        this.panelOpenState = false;
        this.referrer = '';
    }
}
