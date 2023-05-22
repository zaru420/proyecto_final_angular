import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../alumnos.service';
import { alumno } from '../alumno';

@Component({
  selector: 'app-alumno-lista',
  templateUrl: './alumno-lista.component.html',  // Cambio aquí
  // styleUrls: ['./alumno-lista.component.css'] // Comentado si no se usa
})
export class AlumnoListaComponent implements OnInit {
  alumnos: alumno[] = [];  // alumnos con minúscula inicial

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.alumnoService.getTodos().subscribe(alumnos => this.alumnos = alumnos);
  }
}
