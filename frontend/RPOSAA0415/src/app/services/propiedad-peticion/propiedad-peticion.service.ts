import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJsonApiData } from '@morphe/common';
import { GenericDataService } from '../generic-data.service';
import { ResponseType, PostRequestType, PutRequestType, urlGetAllTemplate, urlAddTemplate, urlUpdateTemplate } from './propiedad-peticion-config';

@Injectable({
    providedIn: 'root'
})
export class PropiedadPeticionService {

    constructor(private genericDataService: GenericDataService<ResponseType, PostRequestType, PutRequestType>) { }

    private parseUrlTemplate(template: string, params: Record<string, any>): string[] {
        return template.split('/').map(segment => {
            const match = segment.match(/{(\w+)}/);
            if (match) {
                const key = match[1];
                return params[key] || segment;
            }
            return segment;
        });
    }

    get$(idPeticion: number, queryParams?: Record<string, any>):
        Observable<IJsonApiData<ResponseType>[]> {

        const urlSegments = this.parseUrlTemplate(urlGetAllTemplate, { idPeticion });
        return this.genericDataService.get$(urlSegments, queryParams);

    }

    add$(idPeticion: number, entity: PostRequestType):
        Observable<IJsonApiData<ResponseType>> {
        const urlSegments = this.parseUrlTemplate(urlAddTemplate, { idPeticion });
        return this.genericDataService.add$(urlSegments, entity);
    }

    update$(idPeticion: number, idPropiedad: string, entity: PutRequestType):
        Observable<IJsonApiData<ResponseType>> {
        const urlSegments = this.parseUrlTemplate(urlUpdateTemplate, { idPeticion, idPropiedad });
        return this.genericDataService.update$(urlSegments, entity);
    }

    getData$(): Observable<IJsonApiData<ResponseType>[]> {
        return this.genericDataService.getData$();
    }

    get cargando(): boolean {
        return this.genericDataService.cargando;
    }

    set cargando(value: boolean) {
        this.genericDataService.cargando = value;
    }
}
