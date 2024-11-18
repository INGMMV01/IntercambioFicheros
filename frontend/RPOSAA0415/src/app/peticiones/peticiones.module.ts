import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeticionesRoutingModule } from './peticiones-routing.module';
import { PeticionesComponent } from './peticiones.component';


@NgModule({
    declarations: [
        PeticionesComponent
    ],
    imports: [
        CommonModule,
        PeticionesRoutingModule
    ]
})
export class PeticionesModule { }
