import { Component, OnInit  } from '@angular/core';
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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  alumno:alumno =  { 
    id: 111,
    nombre: 'Benito',
    DNI: '',
    apellidos: 'Camela',
    usuario: '',
    contraseña: '',
    foto: '',
    direccion: '',
    telefono: '',
  }
};

  // export const alumnos: alumno[]=[ 
  //   {id: 1, nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  //   {id: 2, nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  //   {id: 3, nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  //   {id: 4 , nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  //   {id: 5, nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  //   {id: 6, nombre: '',DNI: '', apellidos: '', usuario: '', contraseña: '', foto: '', direccion: '', telefono: '', },
  // ];


  // constructor(), { };

  // ngOnInit(), {  };



// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }

// function constructor() {
//   throw new Error('Function not implemented.');
// }

