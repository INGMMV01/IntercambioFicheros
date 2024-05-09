import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        LayoutRoutingModule
    ],
    declarations: [PageNotFoundComponent]
})
export class LayoutModule { }
