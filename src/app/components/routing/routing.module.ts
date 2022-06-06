import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { InfoUsuariosComponent } from '../info-usuarios/info-usuarios.component';

const loginPage = {
  path: 'login',
  component: LoginComponent,
};

const cadastroPage = {
  path: 'cadastro',
  component: CadastroComponent,
};

const infoPage = {
  path: ':id/info',
  component: InfoUsuariosComponent,
};


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  loginPage,
  cadastroPage,
  infoPage,

  // default
  { path: '**', pathMatch: 'full', redirectTo: 'info' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class RoutingModule { }
