import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  private subscription: Subscription = new Subscription();
notificacionesService: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      (message: string) => this.notifications.push(message)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _notifications = new Subject<string>();

  notifications$ = this._notifications.asObservable();

  showNotification(message: string) {
    this._notifications.next(message);
  }
}
