import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private usuarioService: UsuarioService ) {  

  }

  // Autenticación, el Profesor es el Admin
  isProfesor(): boolean {
    // Verificar si el tipo de usuario es "profesor"
    // Puedes usar la propiedad "tipoUsuario" del usuario actual para realizar la verificación
    // Por ejemplo, si el tipo de usuario "profesor" tiene el ID 2:
    // console.log(  this.usuarioService.isProfesor());
    return this.usuarioService.isProfesor();
  }
  
  // Autenticación, el Profesor es el Admin
  isLogged(): boolean {
    // Verificar si el tipo de usuario es "profesor"
    // Puedes usar la propiedad "tipoUsuario" del usuario actual para realizar la verificación
    // Por ejemplo, si el tipo de usuario "profesor" tiene el ID 2:
    // console.log(  this.usuarioService.isLogged());
    return this.usuarioService.isLogged();
  }

  logout(): void {
    // Cerrar la sesión del usuario
    this.usuarioService.logout();
  }
}
