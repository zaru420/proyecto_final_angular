import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // // Verificar si hay un usuario en la sesión
    // const currentUser = sessionStorage.getItem('currentUser');
    // if (!currentUser) {
    //   // Si no hay usuario en la sesión, redirigir al login
    //   this.router.navigate(['/login']);
    // }
  }

}
