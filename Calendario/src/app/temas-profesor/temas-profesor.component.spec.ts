import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemasProfesorComponent } from './temas-profesor.component';

describe('TemasProfesorComponent', () => {
  let component: TemasProfesorComponent;
  let fixture: ComponentFixture<TemasProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemasProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemasProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
