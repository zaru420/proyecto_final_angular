// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //--------------------------------- PROPIEDADES DEL USUARIOSERVICE ---------------------------------//
  private API_URL = 'http://localhost:8080/api/usuario';

  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;


  //--------------------------------- CONSTRUCTOR ---------------------------------//
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  /**
   *  ---------- OBTENER UNA LISTA DE TODOS LOS USUARIOS ---------- 
   * @returns devuelve una array de usuarios
   */
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}`);
  }

  /**
   *  ---------- BUSCAR USUARIOS POR NOMBRE ( BBDD ) ----------
   * @param username - usuario.nombre, tipo String, y Observable(actualizar auto)
   * @returns devuelve los usuarios con el mismo nombre 
   */
  getByUsername(username: string): Observable<Usuario> {
    const url = `${this.API_URL}?usuario=${username}`;
    return this.http.get<Usuario>(url);
  }

  /**
   *  ---------- CREAR USUARIO ----------  
   * @param usuario - observable con los datos a crear, que lo sacas del modelo (los datos)
   * @returns  devuelve los datos del usuario guardados en la BBDD
   */
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_URL}`, usuario);
  }

  /**
   * ---------- ACTUALIZAR USUARIO ----------
   * @param id - type number 
   * @param usuario - type Usuario (modelo)
   * @returns devuelve el usuario actualizado
   */
  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, usuario);
  }

  /**
   *  ---------- BORRAR USUARIO ----------
   * @param id - type number
   * @returns en caso de error devuelve una excepcion con un message
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  

  //--------------------------------- AUTENTICACION DE USUARIOS ---------------------------------//
  /**
   * Getter del usuario logeado
   * @returns devuelve los datos del usuario logeado, o null
   */
  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }
  
  /**
   *  Autenticación, Profesor es el Admin
   * @returns - devuelve true si tiene el tipoUsuario de "currentUser.tipoUsuario"= (1), osea, es un profesor logeado. En caso contrario false 
   */ 
  public isProfesor(): boolean {
    // Verificar si el tipo de usuario es "profesor"
    // Puedes usar la propiedad "tipoUsuario" del usuario actual para realizar la verificación
    // Por ejemplo, si el tipo de usuario "profesor" tiene el ID 1:
    return this.currentUserValue?.tipoUsuario === 1 ? true : false;
  }

  /**
   * Autenticacion de usuario logeado 
   * @returns - devuelve true si estas logeado, y false si no lo estas 
   */
  public isLogged(): boolean {
    // Retorna true si hay un usuario en currentUserValue
    return !!this.currentUserValue;
  }

  /**
   * Login del usuario
   * @param username el nombre de usuario que tenga registrado
   * @param password la contrasena que tenga registrada 
   * @returns devuelve el inicio de sesion si ambas son correctas y en caso contrario ERROR con message
   */
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

  /**
   * Cierra la sesion 
   */
  logout(): void {
    // Eliminar el usuario del estado actual
    this.currentUserSubject.next(null);
  }
}
