import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoRoutingModule } from './nuevo-routing.module';
import { NuevoComponent } from './nuevo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        NuevoComponent
    ],
    imports: [
        CommonModule,
        NuevoRoutingModule,
        SharedModule
    ]
})
export class NuevoModule { }
