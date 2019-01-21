import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerciciosProfesorComponent } from './ejercicios-profesor.component';

describe('EjerciciosProfesorComponent', () => {
  let component: EjerciciosProfesorComponent;
  let fixture: ComponentFixture<EjerciciosProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjerciciosProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjerciciosProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
