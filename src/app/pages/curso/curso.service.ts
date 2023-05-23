// curso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private API_URL = 'http://localhost:8080/api/cursos';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de todos los cursos.
   * @returns Devuelve un array de cursos.
   */
  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API_URL);
  }

  /**
   * Busca cursos por nombre en la base de datos.
   * @param nombre - Nombre del curso a buscar.
   * @returns Devuelve los cursos con el mismo nombre.
   */
  getByNombre(nombre: string): Observable<Curso[]> {
    const url = `${this.API_URL}?nombre=${nombre}`;
    return this.http.get<Curso[]>(url);
  }

  /**
   * Crea un nuevo curso.
   * @param curso - Datos del curso a crear.
   * @returns Devuelve los datos del curso guardados en la base de datos.
   */
  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.API_URL, curso);
  }

  /**
   * Actualiza un curso existente.
   * @param id - ID del curso a actualizar.
   * @param curso - Datos actualizados del curso.
   * @returns Devuelve el curso actualizado.
   */
  update(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.API_URL}/${id}`, curso);
  }

  /**
   * Elimina un curso.
   * @param id - ID del curso a eliminar.
   * @returns En caso de error, devuelve una excepción con un mensaje.
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
export { Curso };

