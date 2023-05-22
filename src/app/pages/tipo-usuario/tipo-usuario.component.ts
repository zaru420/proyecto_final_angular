// tipo-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from './tipo-usuario';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {
  tipoUsuarios: TipoUsuario[] = [];
  currentTipoUsuario: TipoUsuario = new TipoUsuario();
  isEditing = false;
  funcionesPosibles: string[] = ['Profesor', 'Alumno'];
  searchText: string = '';
  filteredTipoUsuarios: TipoUsuario[] = [];
  filterField: keyof TipoUsuario | '' = '';

  constructor(private tipoUsuarioService: TipoUsuarioService) { }

  ngOnInit(): void {
    this.getAllTipoUsuarios();
  }

  getAllTipoUsuarios(): void {
    this.tipoUsuarioService.getAll().subscribe(
      data => {
        this.tipoUsuarios = data;
        this.applyFilter(this.filterField, this.searchText);
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      });
  }

  createTipoUsuario(): void {
    if (this.isEditing) {
      this.updateTipoUsuario();
    } else {
      this.tipoUsuarioService.create(this.currentTipoUsuario).subscribe(
        response => {
          console.log(response);
          this.getAllTipoUsuarios();
          confirm('Tipo Usuario creado correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        });
    }
    this.currentTipoUsuario = new TipoUsuario();
    this.isEditing = false;
  }

  updateTipoUsuario(): void {
    this.tipoUsuarioService.update(this.currentTipoUsuario.id, this.currentTipoUsuario).subscribe(
      response => {
        console.log(response);
        this.getAllTipoUsuarios();
        confirm('Tipo Usuario actualizado correctamente');
      },
      error => {
        const errorMessage = this.getFirstErrorMessage(error.error.trace);
        confirm('Algo ha salido mal: \n' + errorMessage);
        console.log(error);
      });
  }

  editTipoUsuario(tipoUsuario: TipoUsuario): void {
    this.isEditing = true;
    this.currentTipoUsuario = { ...tipoUsuario };  // Copy to avoid editing in list before saving
    this.applyFilter(this.filterField, this.searchText);
  }

  deleteTipoUsuario(tipoUsuario: TipoUsuario): void {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de usuario?')) {
      this.tipoUsuarioService.delete(tipoUsuario.id).subscribe(
        response => {
          console.log(response);
          this.getAllTipoUsuarios();
          confirm('Tipo Usuario borrado correctamente');
        },
        error => {
          const errorMessage = this.getFirstErrorMessage(error.error.trace);
          confirm('Algo ha salido mal: \n' + errorMessage);
          console.log(error);
        });
    }
  }

  applyFilter(filterField: keyof TipoUsuario | '', searchText: string): void {
    // console.log(searchText);
    this.filteredTipoUsuarios = this.tipoUsuarios.filter(tipoUsuario => {
      // console.log(filterField, searchText);
      // console.log(tipoUsuario);
      // // filtramos el tipoUsuario por el searchText y el filterField:
      if (searchText && searchText.length > 0) {
        if(filterField && filterField.length > 0) {
          return tipoUsuario[filterField].toString().toLowerCase().includes(searchText);
        } else {
          return tipoUsuario['nombre'].toString().toLowerCase().includes(searchText);
        }
      } else {
        return true
      }
    });
    // console.log(this.filteredTipoUsuarios);
  }

  private getFirstErrorMessage(trace: string): string {
    const lines = trace.split('\r\n');
    return lines[0];
  }
  
}
