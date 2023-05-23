import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent {
  constructor(private router: Router, private usuarioService: UsuarioService, private route: ActivatedRoute) {
    // Si no está logueado redirigir al login
    if(!this.usuarioService.isLogged()) { 
      // redirigir al login
      this.router.navigate(['/login']);
    }
  }
}


