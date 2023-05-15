import { Component, OnInit } from '@angular/core';
import { alumno } from '../alumno';

enum TipoUsuario {
  alumno,
  profesor,
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  alumno: any;
  alumnos: alumno[] = [];

  constructor() {}

  ngOnInit(): void {
    this.alumnos = [
      {
        id: 1,
        nombre: 'Juan',
        DNI: '12345678A',
        apellidos: 'González',
        usuario: 'juang',
        contraseña: 'password1',
        foto: 'juang.jpg',
        direccion: 'Calle Mayor 123',
        telefono: '123456789'
      },
      {
        id: 2,
        nombre: 'María',
        DNI: '87654321B',
        apellidos: 'López',
        usuario: 'marial',
        contraseña: 'password2',
        foto: 'marial.jpg',
        direccion: 'Avenida Libertad 45',
        telefono: '987654321'
      },
      {
        id: 3,
        nombre: 'Pedro',
        DNI: '23456789C',
        apellidos: 'Martínez',
        usuario: 'pedrom',
        contraseña: 'password3',
        foto: 'pedrom.jpg',
        direccion: 'Plaza España 67',
        telefono: '456789123'
      },
      {
        id: 4,
        nombre: 'Ana',
        DNI: '98765432D',
        apellidos: 'Rodríguez',
        usuario: 'anar',
        contraseña: 'password4',
        foto: 'anar.jpg',
        direccion: 'Calle Sol 89',
        telefono: '321654987'
      },
      {
        id: 5,
        nombre: 'Luis',
        DNI: '34567891E',
        apellidos: 'Sánchez',
        usuario: 'luisa',
        contraseña: 'password5',
        foto: 'luisa.jpg',
        direccion: 'Avenida del Parque 12',
        telefono: '789123456'
      },
      {
        id: 6,
        nombre: 'Laura',
        DNI: '87654329F',
        apellidos: 'García',
        usuario: 'laurag',
        contraseña: 'password6',
        foto: 'laurag.jpg',
        direccion: 'Calle Luna 34',
        telefono: '654321987'
      }
    ];
  }
};
