import { IPropiedadPeticionPutRequestAttributes } from '../RPOS415/PropiedadPeticionPutRequestAttributes';
import { IPropiedadPeticionResponseAttributes } from '../RPOS415/PropiedadPeticionResponseAttributes';

export function mapResponseToPutRequest(
    response: IPropiedadPeticionResponseAttributes,
    codigoDePeticion: number
): IPropiedadPeticionPutRequestAttributes {
    return {
        codigoDePeticion,
        clave: response.clave,
        nombre: response.nombre,
        valor: response.valor,
        fechaDeModificacion: response.fechaDeModificacion,
    };
}
