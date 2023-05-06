import { Component, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements AfterViewInit {
  @ViewChild('content') content!: ElementRef;
  showFooter = false;
  pageHeight = 0;

  ngAfterViewInit() {
    // Verificar si la referencia existe
    if (this.content) {
      // Obtener altura del contenido
      const contentHeight = this.content.nativeElement.offsetHeight;
  
      // Calcular altura de la página
      const body = document.body;
      const html = document.documentElement;
      this.pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  
      // Ajustar posición del footer
      if (contentHeight < this.pageHeight) {
        this.showFooter = true;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollPosition = scrollY + windowHeight;

    if (scrollPosition >= this.pageHeight) {
      this.showFooter = true;
    } else {
      this.showFooter = false;
    }
  }
}
