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

export interface IPropiedadPeticionPutRequestAttributes {

    // codigoDePeticion
    // CodigoDePeticion
    codigoDePeticion: number;
    // clave
    // clave  propiedad peticion
    clave: string;
    // nombre
    // nombre  propiedad peticion
    nombre: string;
    // valor
    // valor propiedad peticion
    valor: string;
    // fechaDeModificacion
    // fechaDeModificacion propiedad peticion
    fechaDeModificacion: Date;

}
