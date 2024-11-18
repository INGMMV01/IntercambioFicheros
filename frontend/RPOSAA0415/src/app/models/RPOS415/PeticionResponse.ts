import { IJsonApiCollection, IJsonApiObject } from '@morphe/common';
import { IPeticionResponseAttributes } from './PeticionResponseAttributes';

export type IPeticionResponse = IJsonApiObject<IPeticionResponseAttributes>;

export type IPeticionResponseCollection = IJsonApiCollection<IPeticionResponseAttributes>;
