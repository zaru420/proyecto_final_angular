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

  constructor(private tipoUsuarioService: TipoUsuarioService) { }

  ngOnInit(): void {
    this.getAllTipoUsuarios();
  }

  getAllTipoUsuarios(): void {
    this.tipoUsuarioService.getAll().subscribe(
      data => {
        this.tipoUsuarios = data;
      },
      error => {
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
        },
        error => {
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
      },
      error => {
        console.log(error);
      });
  }

  editTipoUsuario(tipoUsuario: TipoUsuario): void {
    this.isEditing = true;
    this.currentTipoUsuario = { ...tipoUsuario };  // Copy to avoid editing in list before saving
  }

  deleteTipoUsuario(tipoUsuario: TipoUsuario): void {
    if (confirm('¿Estás seguro de que quieres eliminar este tipo de usuario?')) {
      this.tipoUsuarioService.delete(tipoUsuario.id).subscribe(
        response => {
          console.log(response);
          this.getAllTipoUsuarios();
        },
        error => {
          console.log(error);
        });
    }
  }
}
