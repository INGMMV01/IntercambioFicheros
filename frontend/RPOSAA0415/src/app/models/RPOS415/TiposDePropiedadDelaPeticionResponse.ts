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
import { IJsonApiObject } from '@morphe/common';
import { IJsonApiData } from '@morphe/common';
import { IJsonApiCollection } from '@morphe/common';
import { ITiposDePropiedadDelaPeticionResponseAttributes
       } from './TiposDePropiedadDelaPeticionResponseAttributes';

export interface ITiposDePropiedadDelaPeticionResponse
       extends IJsonApiObject<ITiposDePropiedadDelaPeticionResponseAttributes> {
}

export interface ITiposDePropiedadDelaPeticionResponseCollection
       extends IJsonApiCollection<ITiposDePropiedadDelaPeticionResponseAttributes> {
}
