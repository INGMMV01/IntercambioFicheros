/*
  Created with caraml API Editor 3.0

  Context Info:
    SourceDocName: RPOS415
    RAMLDescription: API para la gestión de propiedades de peticion CGDN+
    RAMLDocVersion: v1
    TimeStamp: 133620740865669479
    Date: 05-06-2024
    Time: 17:14
*/
import { IErrorHTTP } from './ErrorHTTP';

export interface IMetodoHTTP {

    // nombre
    // Informa del método HTTP al que van asociados los errores
    nombre: string;
    // errores
    // Conjunto de objetos error que el método HTTP puede adoptar.
    errores: IErrorHTTP[];

}
