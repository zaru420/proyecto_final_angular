import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPageComponent } from './master-page.component';

describe('MasterPageComponent', () => {
  let component: MasterPageComponent;
  let fixture: ComponentFixture<MasterPageComponent>;
  let body = document.body;
  let html = document.documentElement;
  let height = Math.max( body.scrollHeight, body.offsetHeight, 
               html.clientHeight, html.scrollHeight, html.offsetHeight );


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

