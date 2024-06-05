import { Injectable } from '@angular/core';
import { BasicHttpClientService } from '@morphe/api';
import { IJsonApiCollection, IJsonApiData } from '@morphe/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



import { IPropiedadPeticionResponseAttributes } from '../../models/RPOS415/PropiedadPeticionResponseAttributes';
import { BaseService } from './BaseService';
import { IGestionDeLaConfiguracionPropiedadPeticionService } from './IGestionDeLaConfiguracionPropiedadPeticionService';

@Injectable({
    providedIn: 'root'
})
export class GestionDeLaConfiguracionPropiedadPeticionService extends BaseService
    implements IGestionDeLaConfiguracionPropiedadPeticionService {

    constructor(private http: BasicHttpClientService) {
        super();
    }

    getPropiedadPeticionResponse(peticionId?: number): Observable<IJsonApiData<IPropiedadPeticionResponseAttributes>[]> {
        const url = `gestionDeLaConfiguracion/peticiones/${peticionId}/propiedadesPeticion`;

        return this.http.apiGet<IJsonApiCollection<IPropiedadPeticionResponseAttributes>>(this.getCGDNCode(), url).pipe(
            map(respuesta => this.mapResponseDataCollection<IPropiedadPeticionResponseAttributes>(respuesta.body))
        );
    }

    private getCGDNCode(): string {
        return 'RPOS415';
    }
}
