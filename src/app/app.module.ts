import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MasterPageComponent } from './layout/master-page/master-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { PerfilAlumnoComponent } from './pages/perfil-alumno/perfil-alumno.component';
import { BackNotasComponent } from './pages/back-notas/back-notas.component';
import { InicioAlumnoComponent } from './pages/inicio-alumno/inicio-alumno.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { TipoUsuarioComponent } from './pages/tipo-usuario/tipo-usuario.component';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MasterPageComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    PerfilAlumnoComponent,
    BackNotasComponent,
    InicioAlumnoComponent,
    AlumnosComponent,
    NotificacionesComponent,
    TipoUsuarioComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    // InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
