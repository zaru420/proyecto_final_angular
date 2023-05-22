import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { TipoUsuarioService } from '../tipo-usuario/tipo-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  currentUsuario: Usuario = new Usuario();
  isEditing = false;
  estadosPosibles = [{label: 'Inactivo', value: 0}, {label: 'Activo', value: 1}];
  tiposUsuarios: { id: number; nombre: string; }[] = [];
  searchText: string = '';
  filteredUsuarios: Usuario[] = [];
  filterField: keyof Usuario | '' = '';
  ocultarFormulario: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    config: NgbAccordionConfig,
    private route: ActivatedRoute
  ) {
    // Personaliza la configuración del acordeón si es necesario
    config.closeOthers = true; // Cierra automáticamente otros paneles al abrir uno
    // Si no está logueado redirigir al login
    if(!this.usuarioService.isLogged() && !this.usuarioService.isProfesor()) { 
      // Si el path no es registro, redirigir al login
      if (this.route.snapshot.url[0].path !== 'registro') {
        // redirigir al login
        this.router.navigate(['/login']);
      }
    } else if(this.usuarioService.isLogged() && this.usuarioService.isProfesor()) { 
      // Si el path es backNotas 
      if (this.route.snapshot.url[0].path === 'backNotas') {
        // no mostrar el formulario de crear usuario
        this.ocultarFormulario = true;
      } else{
        this.ocultarFormulario= false;
      }
    }
  }

  ngOnInit(): void {
    this.getAllUsuarios();
    this.getAllTiposUsuarios();
  }
  // Autenticación, el Profesor es el Admin
  isProfesor(): boolean {
    // Verificar si el tipo de usuario es "profesor"
    // Puedes usar la propiedad "tipoUsuario" del usuario actual para realizar la verificación
    // Por ejemplo, si el tipo de usuario "profesor" tiene el ID 2:
    return this.usuarioService.isProfesor();
  }
  

  getAllUsuarios(): void {
    this.usuarioService.getAll().subscribe(
      data => {
        this.usuarios = data;
        this.applyFilter(this.filterField, this.searchText);
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        // console.log(error);
      }
    );
  }

  getAllTiposUsuarios(): void {
    this.tipoUsuarioService.getAll().subscribe(
      data => {
        this.tiposUsuarios = data.map(tipoUsuario => ({ id: tipoUsuario.id, nombre: tipoUsuario.nombre }));
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        // console.log(error);
      }
    );
  }
  


  createUsuario(): void {
    if (this.isEditing) {
      this.updateUsuario();
    } else {
      this.usuarioService.create(this.currentUsuario).subscribe(
        response => {
          // console.log(response);
          this.getAllUsuarios();
          confirm('Usuario creado correctamente');
          if (this.route.snapshot.url[0].path === 'registro') {
            this.router.navigate(['/']);
          }
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          // console.log(error);
        }
      );
    }
    this.currentUsuario = new Usuario();
    this.isEditing = false;
  }

  updateUsuario(): void {
    this.usuarioService.update(this.currentUsuario.id, this.currentUsuario).subscribe(
      response => {
        // console.log(response);
        this.getAllUsuarios();
        confirm('Usuario actualizado correctamente');
        if (this.route.snapshot.url[0].path === 'registro') {
          this.router.navigate(['/']);
        }
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        // console.log(error);
      }
    );
  }


  editUsuario(usuario: Usuario): void {
    this.isEditing = true;
    this.currentUsuario = { ...usuario };  // Copy to avoid editing in list before saving
  }

  deleteUsuario(usuario: Usuario): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.usuarioService.delete(usuario.id).subscribe(
        response => {
          // console.log(response);
          this.getAllUsuarios();
          confirm('Usuario borrado correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          // console.log(error);
        }
      );
    }
  }

  applyFilter(filterField: keyof Usuario | '', searchText: string): void {
    this.filteredUsuarios = this.usuarios.filter(usuario => {
      if (searchText && searchText.length > 0) {
        if (filterField && filterField.length > 0) {
          return usuario[filterField].toString().toLowerCase().includes(searchText.toLowerCase());
        } else {
          return usuario.nombre.toString().toLowerCase().includes(searchText.toLowerCase());
        }
      } else {
        return true;
      }
    });
  }

  private getFirstErrorMessage(trace: string): string {
    const lines = trace.split('\r\n');
    return lines[0];
  }
}
