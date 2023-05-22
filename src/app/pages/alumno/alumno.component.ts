import { AlumnoService } from './../alumnos/Alumnos.service';
import { alumno } from './../alumnos/alumno';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  listaAlumnos : alumno[] = [];
  
  constructor(private alumnoService: AlumnoService) {}  // Aquí es AlumnoService

  getAlumnos(): void {
    this.alumnoService.getAlumno().subscribe((alumnos: alumno[]) => this.listaAlumnos = alumnos);
  }

  ngOnInit (): void {
    this.getAlumnos();
  }
}
