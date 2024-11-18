/* eslint-disable sonarjs/no-duplicate-string */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJsonApiData } from '@morphe/common';
import { GenericDataService } from '../generic-data.service';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';
import { IPropiedadPeticionPostRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPostRequestAttributes';
import { IPropiedadPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPutRequestAttributes';
import { GenericService } from '../generic.service';

// Cambia estos tipos según el modelo de datos que utilice tu nuevo servicio
type ResponseType = IPropiedadPeticionResponseAttributes;
type PostRequestType = IPropiedadPeticionPostRequestAttributes;
type PutRequestType = IPropiedadPeticionPutRequestAttributes;

// Cambia estos valores según la configuración de tu nuevo servicio
const cgdnCode = 'RPOS415';
const baseTemplate = 'gestionDeLaConfiguracion';

// Cambia estas plantillas según las URLs que utilice tu nuevo servicio
const urlGetAllTemplate = 'peticiones/{idPeticion}/propiedadesPeticion';
const urlAddTemplate = 'peticiones/{idPeticion}/propiedadesPeticion';
const urlUpdateTemplate = 'peticiones/{idPeticion}/propiedadesPeticion/{idPropiedad}';
const urlGetTemplate = 'peticiones/{idPeticion}/propiedadesPeticion/{idPropiedad}';
const urlDeleteTemplate = 'peticiones/{idPeticion}/propiedadesPeticion/{idPropiedad}';

@Injectable({
    providedIn: 'root'
})
export class PropiedadPeticionService {

    private genericDataService: GenericDataService<ResponseType, PostRequestType, PutRequestType>;

    constructor(private genericService: GenericService<ResponseType, PostRequestType, PutRequestType>) {
        this.genericDataService = new GenericDataService<ResponseType, PostRequestType, PutRequestType>(this.genericService);
    }

    // Método para obtener una entidad específica
    getEntity$(idPeticion: number, idPropiedad: string):
    Observable<ResponseType> {

        const params = { idPeticion, idPropiedad }; // Cambia los parámetros si es necesario

        return this.genericDataService.getEntity$(urlGetTemplate, params, cgdnCode, baseTemplate);
    }

    // Método para obtener todas las entidades
    get$(idPeticion: number, queryParams?: Record<string, any>):
    Observable<IJsonApiData<ResponseType>[]> {

        const params = { idPeticion }; // Cambia los parámetros si es necesario

        return this.genericDataService.get$(urlGetAllTemplate, params, cgdnCode, baseTemplate, queryParams);
    }

    // Método para añadir una nueva entidad
    add$(idPeticion: number, entity: PostRequestType):
    Observable<IJsonApiData<ResponseType>> {

        const params = { idPeticion }; // Cambia los parámetros si es necesario

        return this.genericDataService.add$(urlAddTemplate, params, cgdnCode, baseTemplate, entity);
    }

    // Método para actualizar una entidad existente
    update$(idPeticion: number, idPropiedad: string, entity: PutRequestType):
    Observable<IJsonApiData<ResponseType>> {

        const params = { idPeticion, idPropiedad }; // Cambia los parámetros si es necesario

        return this.genericDataService.update$(urlUpdateTemplate, params, cgdnCode, baseTemplate, entity);
    }

    // Método para eliminar una entidad específica
    delete$(idPeticion: number, idPropiedad: string):
    Observable<IJsonApiData<ResponseType>> {

        const params = { idPeticion, idPropiedad }; // Cambia los parámetros si es necesario

        return this.genericDataService.delete$(urlDeleteTemplate, params, cgdnCode, baseTemplate);
    }

    // Método para subscribirse al estado de los datos
    getData$(): Observable<IJsonApiData<ResponseType>[]> {
        return this.genericDataService.getData$();
    }

    // Propiedad para controlar el estado de carga
    get cargando(): boolean {
        return this.genericDataService.cargando;
    }

    get guardando(): boolean {
        return this.genericDataService.guardando;
    }
}
