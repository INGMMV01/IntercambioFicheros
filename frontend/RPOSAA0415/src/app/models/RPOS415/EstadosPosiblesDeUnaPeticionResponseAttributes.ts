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

export interface IEstadosPosiblesDeUnaPeticionResponseAttributes {

    // codigoDeEstado
    // Codigo del estado
    codigoDeEstado: number;
    // timestampDelRpositem
    // Fecha del Rpos Item
    timestampDelRpositem: Date;
    // nombre
    // Nombre
    nombre: string;
    // descripcionCorta
    // Descripcion corta
    descripcionCorta: string;
    // descripcion
    // Descripcion
    descripcion: string;
    // modificableExternamente
    // Modificable externamente
    modificableExternamente: string;
    // metodoDePlugInQueModificaElEstado
    // Metodo de plugin que modifica el estado
    metodoDePlugInQueModificaElEstado: string;

}
