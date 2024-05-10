import { Injectable } from '@angular/core';
import { IJsonApiData } from '@morphe/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPropiedadPeticionResponseAttributes } from '../models/RPOS415/PropiedadPeticionResponseAttributes';
import { GestionDeLaConfiguracionPropiedadPeticionService } from './RPOS415/GestionDeLaConfiguracionPropiedadPeticionService';

@Injectable({
    providedIn: 'root'
})
export class PropiedadPeticionService {

    private data$: BehaviorSubject<IJsonApiData<IPropiedadPeticionResponseAttributes>[]> =
    new BehaviorSubject<IJsonApiData<IPropiedadPeticionResponseAttributes>[]>([]);

    public get cargandoPropiedadPeticiones(): boolean {
        return this._cargandoPropiedadPeticiones;
    }

    public set cargandoPropiedadPeticiones(value: boolean) {
        this._cargandoPropiedadPeticiones = value;
    }

    private _cargandoPropiedadPeticiones: boolean;

    // Le llamamos entityListService para los servicios del controller que maneja las colecciones
    // Y le llamaremos entityService para los servicios del controller que maneja una entidad
    constructor(private entityListService:
    GestionDeLaConfiguracionPropiedadPeticionService) {
        this._cargandoPropiedadPeticiones = false;
    }

    obtenerPropiedadPeticiones$(peticionId?: number):
    Observable<IJsonApiData<IPropiedadPeticionResponseAttributes>[]> {
        this.cargandoPropiedadPeticiones = true;

        // const source$ = this.entityListService
        //     .getPropiedadPeticionResponse(peticionId);

        // Datos estáticos simulados
        const datosEstaticos: IJsonApiData<IPropiedadPeticionResponseAttributes>[] = [
            {
                type: 'propiedadPeticion',
                id: '1',
                attributes: {
                    clave: '123',
                    nombre: 'Nombre Propiedad 1',
                    valor: 'Valor de ejemplo 1',
                    fechaDeModificacion: new Date()
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/1'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '2',
                attributes: {
                    clave: '456',
                    nombre: 'Nombre Propiedad 2',
                    valor: 'Valor de ejemplo 2',
                    fechaDeModificacion: new Date()
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/2'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '3',
                attributes: {
                    clave: '789',
                    nombre: 'Nombre Propiedad 3',
                    valor: 'Valor de ejemplo 3',
                    fechaDeModificacion: new Date()
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/3'
                }
            }
        ];

        const source$ = of(datosEstaticos);

        return source$.pipe(
            tap({
                next: () => {
                    this.cargandoPropiedadPeticiones = false;
                }
            })
        );
    }

    getData$(): Observable<IJsonApiData<IPropiedadPeticionResponseAttributes>[]> {
        return this.data$.asObservable().pipe(map((data) => [...data]));
    }

    setData(data: IJsonApiData<IPropiedadPeticionResponseAttributes>[]): void {
        this.data$.next([...data]);
    }
}
