import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeticionesComponent } from './peticiones.component';

const routes: Routes = [
    { path: '', component: PeticionesComponent },
    {
        path: ':idPeticion/propiedades',
        loadChildren: () => import('./peticion-propiedades/peticion-propiedades.module')
            .then(m => m.PeticionPropiedadesModule)
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeticionesRoutingModule { }
