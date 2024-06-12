import { Injectable } from '@angular/core';
import { IJsonApiData } from '@morphe/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService<ResponseAttributes, PostRequestAttributes, PutRequestAttributes> {

    private data$: BehaviorSubject<IJsonApiData<ResponseAttributes>[]> =
        new BehaviorSubject<IJsonApiData<ResponseAttributes>[]>([]);

    public get cargando(): boolean {
        return this._cargando;
    }

    public set cargando(value: boolean) {
        this._cargando = value;
    }

    private _cargando: boolean;

    constructor(private genericService: GenericService<ResponseAttributes, any, any>) {
        this._cargando = false;
    }

    get$(urlSegments: string[], queryParams?: Record<string, any>):
        Observable<IJsonApiData<ResponseAttributes>[]> {
        this.cargando = true;

        const source$ = this.genericService.getEntities(urlSegments, queryParams);

        return source$.pipe(
            tap({
                next: (data) => {
                    this.setData(data);
                    this.cargando = false;
                },
                error: () => {
                    this.cargando = false;
                }
            })
        );
    }

    add$(urlSegments: string[], entity: PostRequestAttributes): Observable<IJsonApiData<ResponseAttributes>> {
        this.cargando = true;
        const source$ = this.genericService.addEntity(urlSegments, entity);
        return source$.pipe(
            tap({
                next: (data) => {
                    this.appendData(data);
                    this.cargando = false;
                },
                error: () => {
                    this.cargando = false;
                }
            })
        );
    }

    update$(urlSegments: string[], entity: PutRequestAttributes): Observable<IJsonApiData<ResponseAttributes>> {
        this.cargando = true;
        const source$ = this.genericService.updateEntity(urlSegments, entity);
        return source$.pipe(
            tap({
                next: (data) => {
                    this.updateData(data);
                    this.cargando = false;
                },
                error: () => {
                    this.cargando = false;
                }
            })
        );
    }

    getData$(): Observable<IJsonApiData<ResponseAttributes>[]> {
        return this.data$.asObservable().pipe(map((data) => [...data]));
    }

    private setData(data: IJsonApiData<ResponseAttributes>[]): void {
        this.data$.next([...data]);
    }

    private appendData(data: IJsonApiData<ResponseAttributes>): void {
        const currentData = this.data$.getValue();
        this.data$.next([...currentData, data]);
    }

    private updateData(data: IJsonApiData<ResponseAttributes>): void {
        const currentData = this.data$.getValue();
        const index = currentData.findIndex(item => item.id === data.id);
        if (index !== -1) {
            currentData[index] = data;
            this.data$.next([...currentData]);
        }
    }
}
