import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSuperusuarioComponent } from './menu-superusuario.component';

describe('MenuSuperusuarioComponent', () => {
  let component: MenuSuperusuarioComponent;
  let fixture: ComponentFixture<MenuSuperusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSuperusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSuperusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
