import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjemploRoutingModule } from './ejemplo-routing.module';
import { EjemploComponent } from './ejemplo.component';


@NgModule({
    declarations: [
        EjemploComponent
    ],
    imports: [
        CommonModule,
        EjemploRoutingModule
    ]
})
export class EjemploModule { }
