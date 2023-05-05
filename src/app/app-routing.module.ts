import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './layout/master-page/master-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent, // Ruta inicial, localhost:4200 y carga del master-page.
    children: [
      // hijos de la master page, si coincide los path los llama
      { path: '', component: HomeComponent},
      { path: 'login', component: LoginComponent},

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
