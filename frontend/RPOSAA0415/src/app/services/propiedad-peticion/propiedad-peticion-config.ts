import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';
import { IPropiedadPeticionPostRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPostRequestAttributes';
import { IPropiedadPeticionPutRequestAttributes } from 'src/app/models/RPOS415/PropiedadPeticionPutRequestAttributes';

// Definición de alias de tipo
export type ResponseType = IPropiedadPeticionResponseAttributes;
export type PostRequestType = IPropiedadPeticionPostRequestAttributes;
export type PutRequestType = IPropiedadPeticionPutRequestAttributes;

// Definir las plantillas de URL como constantes
export const urlGetAllTemplate = 'peticiones/{idPeticion}/propiedadesPeticion';
export const urlAddTemplate = 'peticiones/{idPeticion}/propiedadesPeticion';
export const urlUpdateTemplate = 'peticiones/{idPeticion}/propiedadesPeticion/{idPropiedad}';
