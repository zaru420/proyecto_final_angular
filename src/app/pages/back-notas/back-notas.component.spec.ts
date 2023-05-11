import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNotasComponent } from './back-notas.component';

describe('BackNotasComponent', () => {
  let component: BackNotasComponent;
  let fixture: ComponentFixture<BackNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackNotasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



// <script>
// /* Cuando el usuario hace clic en el botón, 
// cambia la propiedad de display del contenido del menú desplegable */
// function myFunction(dropdownId) {
//   document.getElementById(dropdownId).classList.toggle("show");
// }

// // Cierra el menú desplegable si el usuario hace clic fuera de él
// window.onclick = function(event) {
//   if (!event.target.matches('button')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }