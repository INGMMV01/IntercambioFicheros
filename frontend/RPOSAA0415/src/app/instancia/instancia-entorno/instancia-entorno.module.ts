import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstanciaEntornoRoutingModule } from './instancia-entorno-routing.module';
import { InstanciaEntornoComponent } from './instancia-entorno.component';


@NgModule({
    declarations: [
        InstanciaEntornoComponent
    ],
    imports: [
        CommonModule,
        InstanciaEntornoRoutingModule
    ]
})
export class InstanciaEntornoModule { }
