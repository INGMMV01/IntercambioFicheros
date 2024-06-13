import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleRoutingModule } from './detalle-routing.module';
import { DetalleComponent } from './detalle.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        DetalleComponent
    ],
    imports: [
        CommonModule,
        DetalleRoutingModule,
        SharedModule
    ]
})
export class DetalleModule { }
