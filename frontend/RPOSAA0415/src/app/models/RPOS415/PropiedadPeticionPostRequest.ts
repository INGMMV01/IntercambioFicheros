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
import { IJsonApiObject } from '@morphe/common';
import { IJsonApiData } from '@morphe/common';
import { IJsonApiCollection } from '@morphe/common';
import { IPropiedadPeticionPostRequestAttributes
} from './PropiedadPeticionPostRequestAttributes';

export type IPropiedadPeticionPostRequest = IJsonApiObject<IPropiedadPeticionPostRequestAttributes>;

export type IPropiedadPeticionPostRequestCollection = IJsonApiCollection<IPropiedadPeticionPostRequestAttributes>;
