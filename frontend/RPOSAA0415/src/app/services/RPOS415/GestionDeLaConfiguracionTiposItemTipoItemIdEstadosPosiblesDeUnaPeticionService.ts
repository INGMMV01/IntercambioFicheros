import { Injectable } from '@angular/core';
import { BasicHttpClientService } from '@morphe/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IJsonApiObject , IJsonApiData , IJsonApiCollection , JsonApiHelper } from '@morphe/common';



import { IGestionDeLaConfiguracionTiposItemTipoItemIdEstadosPosiblesDeUnaPeticionService } from './IGestionDeLaConfiguracionTiposItemTipoItemIdEstadosPosiblesDeUnaPeticionService';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes } from '../../models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { BaseService } from './BaseService';


// Class
@Injectable()
export class GestionDeLaConfiguracionTiposItemTipoItemIdEstadosPosiblesDeUnaPeticionService extends BaseService
    implements IGestionDeLaConfiguracionTiposItemTipoItemIdEstadosPosiblesDeUnaPeticionService {

    constructor(private http: BasicHttpClientService) {
        super();
    }

    getEstadosPosiblesDeUnaPeticionResponse(tipoItemId?: string):
    Observable<IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[]> {
        const url = `gestionDeLaConfiguracion/tiposItem/${tipoItemId}/estadosPosiblesDeUnaPeticion`;
        const params = { tipoItemId };

        return this.http.apiGet<IJsonApiCollection<IEstadosPosiblesDeUnaPeticionResponseAttributes>>(this.getCGDNCode(), url, params).pipe(
            map(respuesta => this.mapResponseDataCollection<IEstadosPosiblesDeUnaPeticionResponseAttributes>(respuesta.body))
        );
    }

    private getCGDNCode(): string {
        return 'RPOS415';
    }

}
