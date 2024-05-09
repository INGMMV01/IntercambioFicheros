import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeticionPropiedadesRoutingModule } from './peticion-propiedades-routing.module';
import { PeticionPropiedadesComponent } from './peticion-propiedades.component';
import { FiltroComponent } from './filtro/filtro.component';
import { ListaComponent } from './lista/lista.component';


@NgModule({
    declarations: [
        PeticionPropiedadesComponent,
        FiltroComponent,
        ListaComponent
    ],
    imports: [
        CommonModule,
        PeticionPropiedadesRoutingModule
    ]
})
export class PeticionPropiedadesModule { }
