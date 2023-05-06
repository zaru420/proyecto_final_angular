import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent {
  showFooter: boolean = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollTop >= height) {
      this.showFooter = true;
    } else {
      this.showFooter = false;
    }
  }

  ngAfterViewInit() {
    // Initialize the variable to true if the page is already in the final position
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollTop >= height) {
      this.showFooter = true;
    }
  }
}
