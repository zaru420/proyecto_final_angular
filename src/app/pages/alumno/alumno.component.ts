import { Component } from '@angular/core';
import { alumnosService } from '../alumnos.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {
  listaAlumnos : alumnosService[] = [];
  
  getAlumnos(): void{
    this.listaAlumnos= this.alumnosService.getAlumno();
  }

  ngOnInit (): void{
    this.getAlumnos();
  }
  constructor(private alumnosService: alumnosService) {}
  



}
