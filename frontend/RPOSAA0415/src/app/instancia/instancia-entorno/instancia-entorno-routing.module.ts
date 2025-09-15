import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanciaEntornoComponent } from './instancia-entorno.component';

const routes: Routes = [{ path: '', component: InstanciaEntornoComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstanciaEntornoRoutingModule { }
