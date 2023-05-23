// asignaturas.model.ts
export class Asignaturas {
    id!: number;
    nombre!: string;
    idProfesor1!: number;
    idProfesor2!: number;
  
    constructor() {
      this.id = 0;
      this.nombre = "";
      this.idProfesor1 = 0;
      this.idProfesor2 = 0;
    }
  }
  