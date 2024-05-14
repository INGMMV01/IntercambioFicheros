import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFiltros } from '../../models/propiedad-peticion/Filtros';


@Injectable({
    providedIn: 'root'
})
export class FiltroPropiedadesPeticionService {

    private filtros$: BehaviorSubject<IFiltros> =
    new BehaviorSubject<IFiltros>(new Object() as IFiltros);

    constructor() { }

    setFiltros(filtros: IFiltros): void {
        this.filtros$.next(filtros);
    }

    getFiltros(): IFiltros {
        return this.filtros$.getValue();
    }

    getFiltros$(): Observable<IFiltros> {
        return this.filtros$.asObservable().pipe(map(filtros => filtros));
    }
}
