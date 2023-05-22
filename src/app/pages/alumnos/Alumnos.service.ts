import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { alumno } from './alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiURL = 'http://localhost:8080/api/usuario';  
  getAlumno: any;
  actualizarAlumno: any;
  eliminarAlumno: any;

  constructor(private http: HttpClient) { }
  // private http: HttpClient,
  // private notificacionesService: NotificacionesService) { }
  // this.notificacionesService.add(AlumnoService 'alumnoService' $(Notification))

  getTodos(): Observable<alumno[]> {
    return this.http.get<alumno[]>(this.apiURL);
  }

  crearAlumno(alumno: alumno): Observable<alumno> {
    return this.http.post<alumno>(this.apiURL, alumno);
  }
  
  // Otros métodos para actualizar, borrar, etc.
}
