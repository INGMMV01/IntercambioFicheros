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

export interface IPeticionPutRequestAttributes {

    // codigoEstadoDeLaPeticion
    // CodigoEstadoDeLaPeticion
    codigoEstadoDeLaPeticion: number;
    // fechaDeAltaCreacionDeLaPeticion
    // FechaDeAltaCreacionDeLaPeticion
    fechaDeAltaCreacionDeLaPeticion: Date;
    // fechaDeSalidaDeLaPeticion
    // FechaDeSalidaDeLaPeticion
    fechaDeSalidaDeLaPeticion: Date;
    // fechaDeAceptacionDeLaPeticion
    // FechaDeAceptacionDeLaPeticion
    fechaDeAceptacionDeLaPeticion: Date;
    // fechaDePaseAExplotacionDeLaPeticion
    // FechaDePaseAExplotacionDeLaPeticion
    fechaDePaseAExplotacionDeLaPeticion: Date;
    // timestampDelRpositem
    // TimestampDelRpositem
    timestampDelRpositem: Date;
    // codigoDeLaPeticion
    // CodigoDeLaPeticion
    codigoDeLaPeticion: number;
    // codigoDeItem
    // CodigoDeItem
    codigoDeItem: number;
    // codigoDelProyectoAsociadoALaPeticion
    // CodigoDelProyectoAsociadoALaPeticion
    codigoDelProyectoAsociadoALaPeticion: number;
    // numeroInternoDeLaPeticion
    // NumeroInternoDeLaPeticion
    numeroInternoDeLaPeticion: number;
    // peticionActiva
    // PeticionActiva
    peticionActiva: string;
    // motivo
    // Motivo
    motivo: string;
    // descripcion
    // Descripcion de la peticion
    descripcion: string;
    // libreriaDePruebasDeEdicionDeLaPeticion
    // LibreriaDePruebasDeEdicionDeLaPeticion
    libreriaDePruebasDeEdicionDeLaPeticion: string;
    // grupoDeUsuarios
    // GrupoDeUsuarios
    grupoDeUsuarios: string;
    // tipoDePeticion
    // TipoDePeticion
    tipoDePeticion: string;
    // tipoItem
    // TipoItem
    tipoItem: string;

}
