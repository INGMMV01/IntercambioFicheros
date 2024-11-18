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

export interface IErrorDeValidacion {

    // codigoDeError
    // Código de error Abanca.
    codigoDeError: string;
    // nombre
    // Titulo descriptivo del error.
    nombre: string;
    // descripcion
    // Detalles adicionales proporcionados al programador.
    descripcion: string;

}
