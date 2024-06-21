import { Injectable } from '@angular/core';
import { GenericDataService } from '../generic-data.service';
import { GenericService } from '../generic.service';
import { IJsonApiData } from '@morphe/common';
import { Observable } from 'rxjs';

// Cambia estos tipos según el modelo de datos que utilice tu nuevo servicio
type ResponseType = never;

// Cambia estos valores según la configuración de tu nuevo servicio
const cgdnCode = 'RPOS415';
const baseTemplate = 'gestionDeLaConfiguracion';

// Cambia estas plantillas según las URLs que utilice tu nuevo servicio
const urlGetAllTemplate = 'tiposDePropiedadDelaPeticion';

@Injectable({
    providedIn: 'root'
})
export class TipoPropiedadPeticionService {

    private genericDataService: GenericDataService<ResponseType, never, never>;

    constructor(private genericService: GenericService<ResponseType, never, never>) {
        this.genericDataService = new GenericDataService<ResponseType, never, never>(this.genericService);
    }

    // Método para obtener todas las entidades
    get$(queryParams?: Record<string, any>):
    Observable<IJsonApiData<ResponseType>[]> {

        const params = { }; // Cambia los parámetros si es necesario

        return this.genericDataService.get$(urlGetAllTemplate, params, cgdnCode, baseTemplate, queryParams);
    }

    // Método para subscribirse al estado de los datos
    getData$(): Observable<IJsonApiData<ResponseType>[]> {
        return this.genericDataService.getData$();
    }

    // Propiedad para controlar el estado de carga
    get cargando(): boolean {
        return this.genericDataService.cargando;
    }

    set cargando(value: boolean) {
        this.genericDataService.cargando = value;
    }
}
