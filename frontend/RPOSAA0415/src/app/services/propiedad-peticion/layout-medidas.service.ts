import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutMedidasService {

    private filtroFormHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() { }

    setFiltroForm(filtroForm: number): void {
        this.filtroFormHeight$.next(filtroForm);
    }

    getFiltroForm$(): BehaviorSubject<number> {
        return this.filtroFormHeight$;
    }

}
