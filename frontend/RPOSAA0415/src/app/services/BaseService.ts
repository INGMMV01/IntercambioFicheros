import { IJsonApiCollection, IJsonApiData, IJsonApiObject } from '@morphe/common';

export class BaseService {

    protected mapResponseAttributes<T>(body: IJsonApiObject<T> | null): T {
        if (body?.data !== undefined) {
            return body.data.attributes;
        } else {
            return new Object() as T;
        }
    }

    protected mapResponseData<T>(body: IJsonApiObject<T> | null): IJsonApiData<T> {
        if (body?.data !== undefined) {
            return body.data;
        } else {
            return new Object() as IJsonApiData<T>;
        }
    }

    protected mapResponseDataCollection<T>(body: IJsonApiCollection<T> | null): IJsonApiData<T>[] {
        if (body?.data !== undefined) {
            return body.data;
        } else {
            return new Object() as IJsonApiData<T>[];
        }
    }
}
