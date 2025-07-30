import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { EstadoService } from '../estados/estado.service';
import { IJsonApiData } from '@morphe/common';
import { IEstadosPosiblesDeUnaPeticionResponseAttributes } from 'src/app/models/RPOS415/EstadosPosiblesDeUnaPeticionResponseAttributes';
import { IPropiedadPeticionResponseAttributes } from 'src/app/models/RPOS415/PropiedadPeticionResponseAttributes';

@Injectable({
    providedIn: 'root'
})
export class PropiedadPeticionEstadoService {
    private _clavesDeEstados: string[] =
    ['4', '5', '10', '11', '12', 'CodigoEstadoDeLaPeticion', 'EstadoDeLaPeticion', 'Estado', 'EstadoPublicacionPeticion'];
    private estadosSubject: BehaviorSubject<IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[]> =
    new BehaviorSubject<IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[]>([]);
    private estadosCargados = false;

    constructor(private estadoService: EstadoService) {
        this.loadEstados();
    }

    public getEstados$(): Observable<IJsonApiData<IEstadosPosiblesDeUnaPeticionResponseAttributes>[]> {
        return this.estadosSubject.asObservable();
    }

    public get clavesDeEstados(): string[] {
        return this._clavesDeEstados;
    }

    esPropiedadEstado(propiedadPeticion: IPropiedadPeticionResponseAttributes): boolean {
        let esEstado = false;
        if (propiedadPeticion.clave) {
            esEstado = this.clavesDeEstados.includes(propiedadPeticion.clave.toString());
        }

        return esEstado;
    }

    resuelvePropiedadEstado$(propiedadPeticion: IPropiedadPeticionResponseAttributes): Observable<string | null | undefined> {
        // Comprueba si la clave está en clavesDeEstados
        if (this.esPropiedadEstado(propiedadPeticion)) {
            return this.getEstados$().pipe(
                map(estados => {
                    // Encuentra el estado que corresponde al valor de la propiedad
                    const estado = estados.find(e => e.id === propiedadPeticion.valor);

                    // Retorna la descripción del estado o el valor original si no se encuentra el estado
                    return estado ? estado.attributes.descripcion : propiedadPeticion.valor;
                })
            );
        } else {
            // Si la clave no está en la lista, retorna el valor original
            return of(propiedadPeticion.valor);
        }
    }

    private loadEstados() {
        if (!this.estadosCargados) {
            this.estadoService.get$().pipe(
                tap(estados => {
                    this.estadosSubject.next(estados);
                    this.estadosCargados = true;
                })
            ).subscribe();
        }
    }
}
