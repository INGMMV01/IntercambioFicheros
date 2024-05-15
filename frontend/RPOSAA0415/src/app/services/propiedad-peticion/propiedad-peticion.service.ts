import { Injectable } from '@angular/core';
import { IJsonApiData } from '@morphe/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IPropiedadPeticionResponseAttributes } from '../../models/RPOS415/PropiedadPeticionResponseAttributes';
import { GestionDeLaConfiguracionPropiedadPeticionService } from '../RPOS415/GestionDeLaConfiguracionPropiedadPeticionService';

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
                    clave: '1001',
                    nombre: 'Codigo de proyecto',
                    valor: '12345',
                    fechaDeModificacion: new Date('2024-05-01T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/proyecto'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '2',
                attributes: {
                    clave: '1002',
                    nombre: 'Codigo de ticket',
                    valor: '67890',
                    fechaDeModificacion: new Date('2024-05-02T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/ticket'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '3',
                attributes: {
                    clave: '123',
                    nombre: 'RFC',
                    valor: 'RFC-001',
                    fechaDeModificacion: new Date('2024-05-03T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/rfc'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '4',
                attributes: {
                    clave: '456',
                    nombre: 'Motivo',
                    valor: 'Cambio de requerimientos',
                    fechaDeModificacion: new Date('2024-05-04T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/motivo'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '5',
                attributes: {
                    clave: '789',
                    nombre: 'Descripción',
                    valor: 'Actualización del sistema',
                    fechaDeModificacion: new Date('2024-05-05T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/descripcion'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '6',
                attributes: {
                    clave: '1010',
                    nombre: 'Estado',
                    valor: 'En progreso',
                    fechaDeModificacion: new Date('2024-05-06T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/estado'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '7',
                attributes: {
                    clave: '1111',
                    nombre: 'Estado Publicacion',
                    valor: 'Publicado',
                    fechaDeModificacion: new Date('2024-05-07T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/estadoPublicacion'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '8',
                attributes: {
                    clave: '1212',
                    nombre: 'Servidores Pendientes Pilotos',
                    valor: 'Servidor123',
                    fechaDeModificacion: new Date('2024-05-08T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/servidoresPendientesPilotos'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '9',
                attributes: {
                    clave: '1313',
                    nombre: 'Servidores Pendientes Real',
                    valor: 'Servidor456',
                    fechaDeModificacion: new Date('2024-05-09T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/servidoresPendientesReal'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '10',
                attributes: {
                    clave: '1414',
                    nombre: 'Fecha alta',
                    valor: '10/05/2024',
                    fechaDeModificacion: new Date('2024-05-10T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/fechaAlta'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '11',
                attributes: {
                    clave: '1515',
                    nombre: 'Fecha salida',
                    valor: '15/05/2024',
                    fechaDeModificacion: new Date('2024-05-15T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/fechaSalida'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '12',
                attributes: {
                    clave: '1616',
                    nombre: 'Fecha fijación',
                    valor: '20/05/2024',
                    fechaDeModificacion: new Date('2024-05-20T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/fechaFijacion'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '13',
                attributes: {
                    clave: '1717',
                    nombre: 'Fecha pase explotación',
                    valor: '25/05/2024',
                    fechaDeModificacion: new Date('2024-05-25T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/fechaPaseExplotacion'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '14',
                attributes: {
                    clave: '1818',
                    nombre: 'Librería',
                    valor: 'Librería XYZ',
                    fechaDeModificacion: new Date('2024-06-01T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/libreria'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '15',
                attributes: {
                    clave: '1919',
                    nombre: 'Validación',
                    valor: 'Validado',
                    fechaDeModificacion: new Date('2024-06-05T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/validacion'
                }
            },
            {
                type: 'propiedadPeticion',
                id: '16',
                attributes: {
                    clave: '2020',
                    nombre: 'Versión',
                    valor: 'v1.0.2',
                    fechaDeModificacion: new Date('2024-06-10T12:00:00Z')
                },
                links: {
                    self: null,
                    first: null,
                    next: null,
                    prev: null,
                    last: null,
                    related: 'http://ejemplo.com/version'
                }
            },
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
