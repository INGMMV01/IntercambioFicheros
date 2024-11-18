import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'peticiones', loadChildren: () =>
            import('./peticiones/peticiones.module').then(m => m.PeticionesModule)
    },
    { path: 'ejemplos', loadChildren: () => import('./ejemplo/ejemplo.module').then(m => m.EjemploModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
