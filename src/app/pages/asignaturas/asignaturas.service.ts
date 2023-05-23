// asignaturas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignaturas } from './asignaturas';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private API_URL = 'http://localhost:8080/api/asignaturas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Asignaturas[]> {
    return this.http.get<Asignaturas[]>(this.API_URL);
  }

  create(asignatura: Asignaturas): Observable<Asignaturas> {
    return this.http.post<Asignaturas>(this.API_URL, asignatura);
  }

  update(id: number, asignatura: Asignaturas): Observable<Asignaturas> {
    return this.http.put<Asignaturas>(`${this.API_URL}/${id}`, asignatura);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
