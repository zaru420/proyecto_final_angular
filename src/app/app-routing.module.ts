import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './layout/master-page/master-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NotasComponent } from './pages/notas/notas.component';
import { TipoUsuarioComponent } from './pages/tipo-usuario/tipo-usuario.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AsignaturasComponent } from './pages/asignaturas/asignaturas.component';
import { CursoComponent } from './pages/curso/curso.component';




const routes: Routes = [
  {
    path: '', component: MasterPageComponent, // Ruta inicial, localhost:4200 y carga del master-page.
    children: [
      // hijos de la master page, si coincide los path los llama
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},
      { path: 'perfil', component: PerfilComponent},
      { path: 'nota', component: NotasComponent},
      { path: 'tipoUsuario', component: TipoUsuarioComponent},
      { path: 'registro', component: UsuarioComponent},
      { path: 'usuario', component: UsuarioComponent},
      { path: 'asignatura', component: AsignaturasComponent},
      { path: 'curso', component: CursoComponent},


      // esta tiene que ir la ultima, la de errors
      { path: '**', component: NotFoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
