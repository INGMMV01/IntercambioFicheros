import { Injectable } from '@angular/core';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';

@Injectable({
    providedIn: 'root'
})
export class PropiedadPeticionEditableService {

    private _clavesNoEditables: string[] = ['4', '5','10', '11', '12'];

    constructor() {
    }

    public get clavesNoEditables(): string[] {
        return this._clavesNoEditables;
    }

    esPropiedadEditable(propiedadPeticion: IPropiedadPeticionResponseAttributes): boolean {
        let esEditable = true;
        esEditable = !this.clavesNoEditables.includes(propiedadPeticion.clave);

        return esEditable;
    }
}
