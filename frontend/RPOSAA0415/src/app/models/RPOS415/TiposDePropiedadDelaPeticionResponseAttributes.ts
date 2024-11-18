/*
  Created with caraml API Editor 3.0

  Context Info:
    SourceDocName: RPOS415
    RAMLDescription: API para la gestión de propiedades de peticion CGDN+
    RAMLDocVersion: v1
    TimeStamp: 133634422548380594
    Date: 21-06-2024
    Time: 13:17
*/

export interface ITiposDePropiedadDelaPeticionResponseAttributes {

    // timestampDelRpositem
    // Fecha del Rpos Item
    timestampDelRpositem: Date;
    // descripcion
    // Descripcion
    descripcion: string;
    // conversion
    // Conversión
    conversion: string;
    // visibilidad
    // Visibilidad
    visibilidad: string;
    // codigoDeTipoDePropiedad
    // CodigoDeTipoDePropiedad
    codigoDeTipoDePropiedad: number;
    // fechaBorradoLogico
    // FechaBorradoLogico
    fechaBorradoLogico: Date;

}
