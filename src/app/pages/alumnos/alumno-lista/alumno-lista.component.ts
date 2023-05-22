import { Component, OnInit } from '@angular/core';
import { alumno } from '../alumno';
import { AlumnoService } from '../Alumnos.service';

@Component({
  selector: 'app-alumno-lista',
  templateUrl: './alumno-lista.component.html',
  styleUrls: ['./alumno-lista.component.css']
})
export class AlumnoListaComponent implements OnInit {
  alumnos!: alumno[];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumno().subscribe((alumno: alumno[]) => {
      this.alumnos = alumno;
    });
  }

  actualizarAlumno(alumno: alumno) {
    this.alumnoService.actualizarAlumno(alumno).subscribe(() => {
      console.log('Alumno actualizado correctamente');
    });
  }

  eliminarAlumno(alumno: alumno) {
    this.alumnoService.eliminarAlumno(alumno.id).subscribe(() => {
      console.log('Alumno eliminado correctamente');
      this.cargarAlumnos();
    });
  }
}
