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

export interface IItemResponseAttributes {

    // criticidad
    // Criticidad del item
    criticidad: string;
    // codigo
    // Codigo del item
    codigo: number;
    // nombre
    // Nombre del item
    nombre: string;
    // descripcion
    // Descripcion del item
    descripcion: string;
    // version
    // Version del item
    version: string;
    // tipo
    // tipo del item
    tipo: string;
    // fechaAlta
    // Fecha Alta del item
    fechaAlta: Date;
    // estadoPeticionActual
    // Estado de la petición actual del item
    estadoPeticionActual: string;
    // estadoProyecto
    // Estado del proyecto del item asociado
    estadoProyecto: string;

}
