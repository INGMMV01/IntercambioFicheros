import { IJsonApiData } from '@morphe/common';
import { Observable } from 'rxjs';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';

export interface IGestionDeLaConfiguracionPropiedadPeticionService {

    getPropiedadPeticionResponse(peticionId?: number): Observable<IJsonApiData<IPropiedadPeticionResponseAttributes>[]>;
}
