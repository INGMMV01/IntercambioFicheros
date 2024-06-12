import { Observable } from 'rxjs';
import { IPeticionResponseAttributes } from 'src/app/models/RPOS415/PeticionResponseAttributes';
import { IPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PeticionPutRequestAttributes';

export interface IGestionDeLaConfiguracionPeticionesPeticionIdService {
    getPeticionResponse (peticionId?: string  ): Observable<IPeticionResponseAttributes>;
    updatePeticionPutRequest (peticionPutRequest: IPeticionPutRequestAttributes, peticionId?: string  ): Observable<any>;
}
