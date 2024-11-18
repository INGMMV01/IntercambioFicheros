import { Injectable } from '@angular/core';
import { BasicHttpClientService } from '@morphe/api';
import { IJsonApiCollection, IJsonApiData, IJsonApiObject, JsonApiHelper } from '@morphe/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    getEntity(urlSegments: string[], cgdnCode: string, baseSegment: string, queryParams?: Record<string, any>):
    Observable<ResponseAttributes> {
        const url = this.buildUrl(urlSegments, baseSegment);

        return this.http.apiGet<IJsonApiObject<ResponseAttributes>>(cgdnCode, url, { params: queryParams }).pipe(
            map(respuesta => this.mapResponseAttributes(respuesta.body))
        );
    }

    getEntities(urlSegments: string[], cgdnCode: string, baseSegment: string, queryParams?: Record<string, any>):
    Observable<IJsonApiData<ResponseAttributes>[]> {
        const url = this.buildUrl(urlSegments, baseSegment);

        return this.http.apiGet<IJsonApiCollection<ResponseAttributes>>(cgdnCode, url, { params: queryParams })
            .pipe(
                map(respuesta => this.mapResponseDataCollection<ResponseAttributes>(respuesta.body))
            );
    }

    // Método unificado para POST
    addEntity(urlSegments: string[], cgdnCode: string, baseSegment: string, entity: PostRequestAttributes):
    Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments, baseSegment);
        const data: IJsonApiData<PostRequestAttributes> = JsonApiHelper.createJsonApiData();
        data.attributes = entity;

        return this.http.apiPost<IJsonApiObject<any>>(cgdnCode, url, { data }).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body))
        );
    }

    // Método unificado para PUT
    updateEntity(urlSegments: string[], cgdnCode: string, baseSegment: string, entity: PutRequestAttributes):
    Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments, baseSegment);
        const data: IJsonApiData<PutRequestAttributes> = JsonApiHelper.createJsonApiData();
        data.attributes = entity;

        return this.http.apiPut<IJsonApiObject<any>>(cgdnCode, url, { data }).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body))
        );
    }

    // Método para DELETE
    deleteEntity(urlSegments: string[], cgdnCode: string, baseSegment: string):
    Observable<IJsonApiData<ResponseAttributes>> {
        const url = this.buildUrl(urlSegments, baseSegment);

        return this.http.apiDelete<any>(cgdnCode, url).pipe(
            map(respuesta => this.mapResponseData<ResponseAttributes>(respuesta.body))
        );
    }

    // Función para construir la URL a partir de los segmentos
    private buildUrl(urlSegments: string[], baseSegment: string): string {
        return `${baseSegment}/${urlSegments.join('/')}`;
    }
}
