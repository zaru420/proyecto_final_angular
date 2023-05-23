// asignaturas.component.ts
import { Component, OnInit } from '@angular/core';
import { Asignaturas } from './asignaturas';
import { AsignaturasService } from './asignaturas.service';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {
  asignaturas: Asignaturas[] = [];
  currentAsignatura: Asignaturas = new Asignaturas();
  isEditing = false;
  searchText: string = '';
  filteredAsignaturas: Asignaturas[] = [];
  filterField: keyof Asignaturas | '' = '';
  profesores: { id: number;  dni: string; nombre: string; }[] = [];

  constructor(private asignaturasService: AsignaturasService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getAllAsignaturas();
    this.getAllProfesores();
  }

  getAllAsignaturas(): void {
    this.asignaturasService.getAll().subscribe(
      data => {
        this.asignaturas = data;
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
  

  createAsignatura(): void {
    if (this.isEditing) {
      this.updateAsignatura();
    } else {
      this.asignaturasService.create(this.currentAsignatura).subscribe(
        response => {
          console.log(response);
          this.getAllAsignaturas();
          confirm('Asignatura creada correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        }
      );
    }
    this.currentAsignatura = new Asignaturas();
    this.isEditing = false;
  }

  updateAsignatura(): void {
    this.asignaturasService.update(this.currentAsignatura.id, this.currentAsignatura).subscribe(
      response => {
        console.log(response);
        this.getAllAsignaturas();
        confirm('Asignatura actualizada correctamente');
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      }
    );
  }

  editAsignatura(asignatura: Asignaturas): void {
    this.isEditing = true;
    this.currentAsignatura = { ...asignatura };  // Copy to avoid editing in list before saving
  }

  deleteAsignatura(asignatura: Asignaturas): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta asignatura?')) {
      this.asignaturasService.delete(asignatura.id).subscribe(
        response => {
          console.log(response);
          this.getAllAsignaturas();
          confirm('Asignatura borrada correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        }
      );
    }
  }

  applyFilter(filterField: keyof Asignaturas | '', searchText: string): void {
    this.filteredAsignaturas = this.asignaturas.filter(asignatura => {
      if (searchText && searchText.length > 0) {
        if (filterField && filterField.length > 0) {
          if (filterField === 'idProfesor1') {
            // Obtener las asignaturas a partir de la ID y DNI del Profesor1:
            const profesor = this.profesores.find(p => p.id === asignatura.idProfesor1 && p.dni.toLowerCase().includes(searchText.toLowerCase()));
            return profesor !== undefined;
          }
          if (filterField === 'idProfesor2') {
            // Obtener las asignaturas a partir de la ID y DNI del Profesor2:
            const profesor = this.profesores.find(p => p.id === asignatura.idProfesor2 && p.dni.toLowerCase().includes(searchText.toLowerCase()));
            return profesor !== undefined;
          }
          return asignatura[filterField].toString().toLowerCase().includes(searchText.toLowerCase());
        } else {
          return asignatura.nombre.toString().toLowerCase().includes(searchText.toLowerCase());
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
