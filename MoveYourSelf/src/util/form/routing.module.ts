import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoUsuariosComponent } from 'src/app/components/info-usuarios/info-usuarios.component';
import { FormComponent } from './form.component';

const loginPage = {
    path: 'login',
    component: FormComponent,
};

const cadastroPage = {
    path: 'cadastro',
    component: FormComponent,
};

const infoPage = {
    path: 'info',
    component: InfoUsuariosComponent,
};

const editarPerfilPage = {
    path: 'editar/:id',
    component: FormComponent,
};

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    loginPage,
    cadastroPage,
    infoPage,
    editarPerfilPage,

    
    // default
    { path: '**', pathMatch: 'full', redirectTo: 'login' },

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class RoutingModule { }