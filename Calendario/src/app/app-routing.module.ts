import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgregarCursoProfesorComponent } from './agregar-curso-profesor/agregar-curso-profesor.component';
import { MenuSuperusuarioComponent } from './menu-superusuario/menu-superusuario.component';
import { ProfesoresSuperusuarioComponent } from './profesores-superusuario/profesores-superusuario.component';
import { EjerciciosProfesorComponent } from './ejercicios-profesor/ejercicios-profesor.component';
import { TemasProfesorComponent } from './temas-profesor/temas-profesor.component';
import { ImagenesSuperusuarioComponent } from './imagenes-superusuario/imagenes-superusuario.component';
import { InformacionComponent } from './informacion/informacion.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'AgregarCursoProfesor', component: AgregarCursoProfesorComponent },
  { path: 'MenuSuperusuario', component: MenuSuperusuarioComponent },
  { path: 'ProfesoresSuperusuario', component: ProfesoresSuperusuarioComponent },
  { path: 'EjerciciosProfesor', component: EjerciciosProfesorComponent },
  { path: 'TemasProfesor', component: TemasProfesorComponent },
  { path: 'ImagenesSuperusuario', component: ImagenesSuperusuarioComponent},
  { path: 'Informacion', component: InformacionComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }




