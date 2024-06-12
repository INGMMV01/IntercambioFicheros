import { Injectable } from '@angular/core';
import { IJsonApiData } from '@morphe/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes }
    from 'src/app/models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { map, tap } from 'rxjs/operators';
import { GenericService } from '../generic.service';

type ResponseAttributes = IEstadosPosiblesDeUnaPeticionResponseAttributes;

@Injectable({
    providedIn: 'root'
})
export class EstadosPeticionService {

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

    get$(tipoItemId: string):
        Observable<IJsonApiData<ResponseAttributes>[]> {
        this.cargando = true;

        const urlSegments = ['tiposItem', tipoItemId, 'estadosPosiblesDeUnaPeticion'];

        const source$ = this.genericService.getEntities(urlSegments);

        return source$.pipe(
            tap({
                next: () => {
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

    setData(data: IJsonApiData<ResponseAttributes>[]): void {
        this.data$.next([...data]);
    }
}
