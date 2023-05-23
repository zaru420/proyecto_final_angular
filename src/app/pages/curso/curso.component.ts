import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit {
  cursos: Curso[] = [];
  currentCurso: Curso = new Curso();
  isEditing = false;
  searchText: string = '';
  filteredCursos: Curso[] = [];
  filterField: keyof Curso | '' = '';
  profesores: { id: number;  dni: string; nombre: string; }[] = [];

  constructor(private cursosService: CursoService, private usuarioService: UsuarioService) {
    
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

  ngOnInit(): void {
    this.getAllCursos();
    this.getAllProfesores();
  }

  getAllCursos(): void {
    this.cursosService.getAll().subscribe(
      data => {
        this.cursos = data;
        this.applyFilter(this.filterField, this.searchText);
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      }
    );
  }

  getAllProfesores(): void {
    this.usuarioService.getAll().subscribe(
      data => {
        this.profesores = data.map(usuario => ({ id: usuario.id, dni: usuario.dni, nombre: usuario.nombre + ' - ' + usuario.apellidos + ' - ' + usuario.dni  }));
        console.log(data);
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      }
    );
  }
  
  getProfesorNombre(idProfesor: number): string {
    const profesor = this.profesores.find(profesor => profesor.id === idProfesor);
    return profesor ? profesor.nombre : '';
  }
  

  createCurso(): void {
    if (this.isEditing) {
      this.updateCurso();
    } else {
      this.cursosService.create(this.currentCurso).subscribe(
        response => {
          console.log(response);
          this.getAllCursos();
          confirm('Curso creada correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        }
      );
    }
    this.currentCurso = new Curso();
    this.isEditing = false;
  }

  updateCurso(): void {
    this.cursosService.update(this.currentCurso.id, this.currentCurso).subscribe(
      response => {
        console.log(response);
        this.getAllCursos();
        confirm('Curso actualizada correctamente');
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      }
    );
  }

  editCurso(curso: Curso): void {
    this.isEditing = true;
    this.currentCurso = { ...curso };  // Copy to avoid editing in list before saving
  }

  deleteCurso(curso: Curso): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta curso?')) {
      this.cursosService.delete(curso.id).subscribe(
        response => {
          console.log(response);
          this.getAllCursos();
          confirm('Curso borrada correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        }
      );
    }
  }

  applyFilter(filterField: keyof Curso | '', searchText: string): void {
    this.filteredCursos = this.cursos.filter(curso => {
      if (searchText && searchText.length > 0) {
        if (filterField && filterField.length > 0) {

          return curso[filterField].toString().toLowerCase().includes(searchText.toLowerCase());
        } else {
          return curso.nombre.toString().toLowerCase().includes(searchText.toLowerCase());
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
