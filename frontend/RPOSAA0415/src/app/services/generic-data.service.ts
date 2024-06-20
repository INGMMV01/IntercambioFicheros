import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { IJsonApiData } from '@morphe/common';
import { map, tap, catchError } from 'rxjs/operators';
import { GenericService } from './generic.service';

@Injectable()
export class GenericDataService<ResponseType, PostRequestType, PutRequestType> {

    private data$: BehaviorSubject<IJsonApiData<ResponseType>[]> =
    new BehaviorSubject<IJsonApiData<ResponseType>[]>([]);

    private _cargando: boolean;

    constructor(private genericService: GenericService<ResponseType, PostRequestType, PutRequestType>) {
        this._cargando = false;
    }

    public get cargando(): boolean {
        return this._cargando;
    }

    public set cargando(value: boolean) {
        this._cargando = value;
    }

    getEntity$(template: string, params: Record<string, any>, cgdnCode: string, baseSegment: string):
    Observable<ResponseType> {
        this.cargando = true;
        const urlSegments = this.parseUrlTemplate(template, params);

        return this.genericService.getEntity(urlSegments, cgdnCode, baseSegment).pipe(
            tap({
                next: () => {
                    this.cargando = false;
                }
            })
        );
    }

    get$(template: string, params: Record<string, any>, cgdnCode: string, baseSegment: string, queryParams?: Record<string, any>):
    Observable<IJsonApiData<ResponseType>[]> {
        const urlSegments = this.parseUrlTemplate(template, params);
        this.cargando = true;

        console.log(`GET ${urlSegments.join('/')} ${this.cargando}`);

        return this.genericService.getEntities(urlSegments, cgdnCode, baseSegment, queryParams).pipe(
            tap({
                next: (data) => {
                    this.setData(data);
                    this.cargando = false;

                    console.log(`GET ${urlSegments.join('/')} ${this.cargando}`);
                }
            })
        );
    }

    add$(template: string, params: Record<string, any>, cgdnCode: string, baseSegment: string, entity: PostRequestType):
    Observable<IJsonApiData<ResponseType>> {
        const urlSegments = this.parseUrlTemplate(template, params);
        this.cargando = true;

        return this.genericService.addEntity(urlSegments, cgdnCode, baseSegment, entity).pipe(
            tap({
                next: (data) => {
                    this.appendData(data);
                    this.cargando = false;
                }
            })
        );
    }

    update$(template: string, params: Record<string, any>, cgdnCode: string, baseSegment: string, entity: PutRequestType):
    Observable<IJsonApiData<ResponseType>> {
        const urlSegments = this.parseUrlTemplate(template, params);
        this.cargando = true;

        return this.genericService.updateEntity(urlSegments, cgdnCode, baseSegment, entity).pipe(
            tap({
                next: (data) => {
                    this.updateData(data);
                    this.cargando = false;
                }
            })
        );
    }

    delete$(template: string, params: Record<string, any>, cgdnCode: string, baseSegment: string):
    Observable<IJsonApiData<ResponseType>> {
        const urlSegments = this.parseUrlTemplate(template, params);
        this.cargando = true;

        return this.genericService.deleteEntity(urlSegments, cgdnCode, baseSegment).pipe(
            tap({
                next: (data) => {
                    this.removeData(data);
                    this.cargando = false;
                }
            })
        );
    }

    getData$(): Observable<IJsonApiData<ResponseType>[]> {
        return this.data$.asObservable().pipe(map((data) => [...data]));
    }

    private setData(data: IJsonApiData<ResponseType>[]): void {
        this.data$.next([...data]);
    }

    private appendData(data: IJsonApiData<ResponseType>): void {
        const currentData = this.data$.getValue();
        this.data$.next([...currentData, data]);
    }

    private updateData(data: IJsonApiData<ResponseType>): void {
        const currentData = this.data$.getValue();
        const index = currentData.findIndex(item => item.id === data.id);
        if (index !== -1) {
            currentData[index] = data;
            this.data$.next([...currentData]);
        }
    }

    private removeData(data: IJsonApiData<ResponseType>): void {
        const currentData = this.data$.getValue();
        this.data$.next(currentData.filter(item => item.id !== data.id));
    }

    private parseUrlTemplate(template: string, params: Record<string, any>): string[] {
        return template.split('/').map(segment => {
            const match = segment.match(/{(\w+)}/);
            if (match) {
                const key = match[1];

                return params[key] || segment;
            }

            return segment;
        });
    }
}
