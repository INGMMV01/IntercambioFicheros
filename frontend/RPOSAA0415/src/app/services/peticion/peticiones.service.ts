/* eslint-disable sonarjs/no-duplicate-string */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJsonApiData } from '@morphe/common';
import { GenericDataService } from '../generic-data.service';
import { GenericService } from '../generic.service';
import { IPeticionResponseAttributes } from 'src/app/models/RPOS415/PeticionResponseAttributes';
import { IPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PeticionPutRequestAttributes';

// Cambia estos tipos según el modelo de datos que utilice tu nuevo servicio
type ResponseType = IPeticionResponseAttributes;
type PostRequestType = never;
type PutRequestType = IPeticionPutRequestAttributes;

// Cambia estos valores según la configuración de tu nuevo servicio
const cgdnCode = 'RPOS415';
const baseTemplate = 'gestionDeLaConfiguracion';

// Cambia estas plantillas según las URLs que utilice tu nuevo servicio
const urlUpdateTemplate = 'peticiones/{peticionId}';
const urlGetTemplate = 'peticiones/{peticionId}';

@Injectable({
    providedIn: 'root'
})
export class PeticionesService {

    private genericDataService: GenericDataService<ResponseType, PostRequestType, PutRequestType>;

    constructor(private genericService: GenericService<ResponseType, PostRequestType, PutRequestType>) {
        this.genericDataService = new GenericDataService<ResponseType, PostRequestType, PutRequestType>(this.genericService);
    }

    // Método para obtener una entidad específica
    getEntity$(peticionId: number):
    Observable<ResponseType> {

        const params = { peticionId }; // Cambia los parámetros si es necesario

        return this.genericDataService.getEntity$(urlGetTemplate, params, cgdnCode, baseTemplate);
    }

    // Método para actualizar una entidad existente
    update$(peticionId: number, entity: PutRequestType):
    Observable<IJsonApiData<ResponseType>> {

        const params = { peticionId }; // Cambia los parámetros si es necesario

        return this.genericDataService.update$(urlUpdateTemplate, params, cgdnCode, baseTemplate, entity);
    }

    // Método para subscribirse al estado de los datos
    getData$(): Observable<IJsonApiData<ResponseType>[]> {
        return this.genericDataService.getData$();
    }

    // Propiedad para controlar el estado de carga
    get cargando(): boolean {
        return this.genericDataService.cargando;
    }
}
