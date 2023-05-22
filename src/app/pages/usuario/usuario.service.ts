// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_URL = 'http://localhost:8080/api/usuario';

  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}`);
  }

  getByUsername(username: string): Observable<Usuario> {
    const url = `${this.API_URL}?usuario=${username}`;
    return this.http.get<Usuario>(url);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}`, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, usuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  
  /// AUTENTICACIÓN
  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }
  // Autenticación, el Profesor es el Admin
  public isProfesor(): boolean {
    // Verificar si el tipo de usuario es "profesor"
    // Puedes usar la propiedad "tipoUsuario" del usuario actual para realizar la verificación
    // Por ejemplo, si el tipo de usuario "profesor" tiene el ID 2:
    return this.currentUserValue?.tipoUsuario === 1 ? true : false;
  }

  // Autenticación, hay un usuario logueado
  public isLogged(): boolean {
    // Retorna true si hay un usuario en currentUserValue
    return !!this.currentUserValue;
  }

  login(username: string, password: string): Observable<Usuario> {
    // Suponiendo que el backend devuelve el usuario si el login es exitoso
    return this.http.post<Usuario>(`${this.API_URL}/login`, { usuario: username, contrasena: password })
      .pipe(map(usuario => {
        // Almacenar el usuario en el estado actual si el login es exitoso
        if (usuario && usuario.contrasena) {
          this.currentUserSubject.next(usuario);
        }

        return usuario;
      }));
  }

  logout(): void {
    // Eliminar el usuario del estado actual
    this.currentUserSubject.next(null);
  }
}
