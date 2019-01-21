import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresSuperusuarioComponent } from './profesores-superusuario.component';

describe('ProfesoresSuperusuarioComponent', () => {
  let component: ProfesoresSuperusuarioComponent;
  let fixture: ComponentFixture<ProfesoresSuperusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresSuperusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresSuperusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
