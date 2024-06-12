import { Injectable } from '@angular/core';
import { BasicHttpClientService } from '@morphe/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJsonApiObject, IJsonApiData, JsonApiHelper } from '@morphe/common';


import { IGestionDeLaConfiguracionPeticionesPeticionIdService }
    from './IGestionDeLaConfiguracionPeticionesPeticionIdService';

import { IPeticionResponseAttributes } from 'src/app/models/RPOS415/PeticionResponseAttributes';
import { IPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PeticionPutRequestAttributes';
import { BaseService } from './BaseService';


// Class
@Injectable()
export class GestionDeLaConfiguracionPeticionesPeticionIdService extends BaseService
    implements IGestionDeLaConfiguracionPeticionesPeticionIdService {

    constructor(private http: BasicHttpClientService) {
        super();
    }

    getPeticionResponse(peticionId?: string): Observable<IPeticionResponseAttributes> {
        const url = `gestionDeLaConfiguracion/peticiones/${peticionId}`;
        const params = { peticionId };

        return this.http.apiGet<IJsonApiObject<IPeticionResponseAttributes>>(this.getCGDNCode(), url, params)
            .pipe(
                map((respuesta) => this.mapResponseAttributes(respuesta.body))
            );
    }


    updatePeticionPutRequest(peticionPutRequest: IPeticionPutRequestAttributes,
        peticionId?: string):
        Observable<IJsonApiData<IPeticionResponseAttributes>> {
        const url = `gestionDeLaConfiguracion/peticiones/${peticionId}`;

        const data: IJsonApiData<any> = JsonApiHelper.createJsonApiData();
        data.attributes = peticionPutRequest;
        const body: IJsonApiObject<any> = JsonApiHelper.createJsonApiObject();
        body.data = data;

        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        return this.http.apiPut<any>(this.getCGDNCode(), url, body).pipe(
            map(respuesta => this.mapResponseData<IPeticionResponseAttributes>(respuesta.body))
        );
    }

    private getCGDNCode(): string {
        return 'RPOS415';
    }
}
