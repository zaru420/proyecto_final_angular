import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  notificaciones: string[] = [];
  // Agrega un mensaje al array de mensajes
  agregarMensaje(mensaje: string) {
    this.notificaciones.push(mensaje);
  }
  // Limpia el array de mensajes, eliminando todos los mensajes almacenados
  limpiarMensajes() {
    this.notificaciones = [];
  }

  constructor() { }
}
