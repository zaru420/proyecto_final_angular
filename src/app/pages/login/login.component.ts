// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario!: string;
  contrasena!: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = '';
    this.contrasena = '';
  }

  login(): void {
    // console.log('hi');
    this.usuarioService.login(this.usuario, this.contrasena)
      .subscribe(
        (usuario) => {
          // Verificar si el login fue exitoso
          if (usuario) {
            // Guardar los datos del usuario en sessionStorage
            // console.log(usuario);
            sessionStorage.setItem('currentUser', JSON.stringify(usuario));
            this.router.navigate(['/']); // Navegar a la página principal después de iniciar sesión
          } else {
            // console.log('Usuario o contraseña inválidos');
          }
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
        }
      );
  }

  private getFirstErrorMessage(trace: string): string {
    const lines = trace.split('\r\n');
    return lines[0];
  }
}
