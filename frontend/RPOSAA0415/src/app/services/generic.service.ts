import { Injectable } from '@angular/core';
import { BasicHttpClientService } from '@morphe/api';
import { IJsonApiCollection, IJsonApiData, IJsonApiObject, JsonApiHelper } from '@morphe/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseService } from './BaseService';

@Injectable({
    providedIn: 'root'
})
export class GenericService<ResponseAttributes, PostRequestAttributes, PutRequestAttributes>
    extends BaseService {
    constructor(private http: BasicHttpClientService) {
        super();
    }

    // Método que usa arrays para construir la URL y manejar query parameters para GET
    getEntity(urlSegments: string[], queryParams?: Record<string, any>): Observable<ResponseAttributes> {
        const url = this.buildUrl(urlSegments);
        return this.http.apiGet<IJsonApiObject<ResponseAttributes>>(this.cgdnCode(), url, { params: queryParams }).pipe(
            map(respuesta => this.mapResponseAttributes(respuesta.body)),
            catchError(error => {
                console.error('Error fetching entity:', error);
                return throwError(`An error occurred: ${error.message}`);
            })
        );
    }

    getEntities(urlSegments: string[], queryParams?: Record<string, any>): Observable<IJsonApiData<ResponseAttributes>[]> {
        const url = this.buildUrl(urlSegments);
        return this.http.apiGet<IJsonApiCollection<ResponseAttributes>>(this.cgdnCode(), url, { params: queryParams }).pipe(
            map(respuesta => this.mapResponseDataCollection<ResponseAttributes>(respuesta.body)),
            catchError(error => {
                console.error('Error fetching entities:', error);
                return throwError(`An error occurred: ${error.message}`);
            })
        );
    }

    // Método unificado para POST
    addEntity(urlSegments: string[], entity: PostRequestAttributes): Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments);
        const data: IJsonApiData<PostRequestAttributes> = JsonApiHelper.createJsonApiData();
        data.attributes = entity;
        return this.http.apiPost<IJsonApiObject<any>>(this.cgdnCode(), url, { data }).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body)),
            catchError(error => {
                console.error('Error adding entity:', error);
                return throwError(`An error occurred: ${error.message}`);
            })
        );
    }

    // Método unificado para PUT
    updateEntity(urlSegments: string[], entity: PutRequestAttributes): Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments);
        const data: IJsonApiData<PutRequestAttributes> = JsonApiHelper.createJsonApiData();
        data.attributes = entity;
        return this.http.apiPut<IJsonApiObject<any>>(this.cgdnCode(), url, { data }).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body)),
            catchError(error => {
                console.error('Error updating entity:', error);
                return throwError(`An error occurred: ${error.message}`);
            })
        );
    }

    // Método para DELETE
    deleteEntity(urlSegments: string[]): Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments);
        return this.http.apiDelete<any>(this.cgdnCode(), url).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body)),
            catchError(error => {
                console.error('Error deleting entity:', error);
                return throwError(`An error occurred: ${error.message}`);
            })
        );
    }


    // Función para construir la URL a partir de los segmentos
    private buildUrl(urlSegments: string[]): string {
        return `${this.baseSegment()}/${urlSegments.join('/')}`;
    }
    private cgdnCode(): string {
        return 'RPOS415';
    }
    private baseSegment(): string {
        return 'gestionDeLaConfiguracion';
    }
}
