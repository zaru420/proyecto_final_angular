export class  TipoUsuario {
  id!: number;
  nombre!: string;
  funciones!: string;

  constructor() {
    this.id = 0;
    this.nombre = "";
    this.funciones = "Alumno";
  }
}
