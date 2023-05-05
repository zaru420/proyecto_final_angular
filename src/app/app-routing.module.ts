import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from './layout/master-page/master-page.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent, // Ruta inicial, localhost:4200 y carga del master-page.
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
