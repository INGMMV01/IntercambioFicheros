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

export interface IEstadoPeticionPutRequestAttributes {

    // codigoDeEstado
    // CodigoDeEstado
    codigoDeEstado: number;
    // timestampDelRpositem
    // TimestampDelRpositem
    timestampDelRpositem: Date;
    // nombre
    // Nombre
    nombre: string;
    // descripcionCorta
    // DescripcionCorta
    descripcionCorta: string;
    // descripcion
    // Descripcion
    descripcion: string;
    // modificableExternamente
    // ModificableExternamente
    modificableExternamente: string;
    // metodoDePlugInQueModificaElEstado
    // MetodoDePlugInQueModificaElEstado
    metodoDePlugInQueModificaElEstado: string;

}
