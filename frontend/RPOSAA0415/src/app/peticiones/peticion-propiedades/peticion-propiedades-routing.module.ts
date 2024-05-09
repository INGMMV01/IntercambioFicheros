import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeticionPropiedadesComponent } from './peticion-propiedades.component';

const routes: Routes = [
    { path: '', component: PeticionPropiedadesComponent },
    { path: ':idPropiedad', loadChildren: () => import('./detalle/detalle.module').then(m => m.DetalleModule) },
    { path: 'nuevo', loadChildren: () => import('./nuevo/nuevo.module').then(m => m.NuevoModule) }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeticionPropiedadesRoutingModule { }
