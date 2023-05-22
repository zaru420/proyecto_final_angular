// usuario.ts
export class Usuario {
  id!: number;
  dni!: string;
  nombre!: string;
  apellidos!: string;
  usuario!: string;
  contrasena!: string;
  foto!: string;
  direccion!: string;
  telefono!: string;
  tipoUsuario!: number;
  activo!: number;

  constructor() {
    this.id = 0;
    this.dni = "";
    this.nombre = "";
    this.apellidos = "";
    this.usuario = "";
    this.contrasena = "";
    this.foto = "";
    this.direccion = "";
    this.telefono = "";
    this.tipoUsuario = 2; // 1=Profesor; 2=Alumno
    this.activo = 0;
  }
}
