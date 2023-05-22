import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuario } from './tipo-usuario';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {
  private API_URL = 'http://localhost:8080/api/tipoUsuario';

  constructor(private http: HttpClient) { }

  // Metodos para implementar en los próximos commits

  getAll(): Observable<TipoUsuario[]> {
    return this.http.get<TipoUsuario[]>(`${this.API_URL}`);
  }

  create(tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.post<TipoUsuario>(`${this.API_URL}`, tipoUsuario);
  }

  update(id: number, tipoUsuario: TipoUsuario): Observable<TipoUsuario> {
    return this.http.put<TipoUsuario>(`${this.API_URL}/${id}`, tipoUsuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
