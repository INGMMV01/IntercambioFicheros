import { Observable } from 'rxjs';
import { IJsonApiData } from '@morphe/common';

import { IEstadosPosiblesDeUnaPeticionResponseAttributes }
    from '../../models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';

export interface IGestionDeLaConfiguracionTiposItemTipoItemIdEstadosPosiblesDeUnaPeticionService {
    getEstadosPosiblesDeUnaPeticionResponse(tipoItemId?: string):
    Observable<IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[]>;
}
