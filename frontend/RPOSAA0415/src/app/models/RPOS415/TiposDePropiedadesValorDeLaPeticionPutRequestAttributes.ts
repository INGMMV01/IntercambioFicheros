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
import { ITipoDePropiedadDeLaPeticionPutRequestAttributes } from './TipoDePropiedadDeLaPeticionPutRequestAttributes';

export interface ITiposDePropiedadesValorDeLaPeticionPutRequestAttributes {

    // timestampDelRpositem
    // TimestampDelRpositem
    timestampDelRpositem: Date;
    // codigoDePeticion
    // CodigoDePeticion
    codigoDePeticion: number;
    // codigoDeTipoDePropiedad
    // CodigoDeTipoDePropiedad
    codigoDeTipoDePropiedad: number;
    // valor
    // Valor
    valor: string;
    // tipoDePropiedad
    // TipoDePropiedad
    tipoDePropiedad: ITipoDePropiedadDeLaPeticionPutRequestAttributes;

}
