import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCursoProfesorComponent } from './agregar-curso-profesor.component';

describe('AgregarCursoProfesorComponent', () => {
  let component: AgregarCursoProfesorComponent;
  let fixture: ComponentFixture<AgregarCursoProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCursoProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCursoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
