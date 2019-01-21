import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuSuperusuarioComponent } from './menu-superusuario/menu-superusuario.component';
import { ProfesoresSuperusuarioComponent } from './profesores-superusuario/profesores-superusuario.component';
import { AgregarCursoProfesorComponent } from './agregar-curso-profesor/agregar-curso-profesor.component';
import { TemasProfesorComponent } from './temas-profesor/temas-profesor.component';
import { EjerciciosProfesorComponent } from './ejercicios-profesor/ejercicios-profesor.component';
import { environment} from '../environments/environment';

import { GestionProfesores } from 'src/services/gestionProfesores-superusuario.service';
import { GestionCursos } from 'src/services/gestionCursos-profesor.service';
import { GestionEjercicios } from 'src/services/gestionEjercicios-profesor.service';
import { GestionCuenta } from 'src/services/gestionCuenta.service';
import { GestionImagenes } from 'src/services/gestionImagenes.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { ImagenesSuperusuarioComponent } from './imagenes-superusuario/imagenes-superusuario.component';
import { InformacionComponent } from './informacion/informacion.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuSuperusuarioComponent,
    ProfesoresSuperusuarioComponent,
    AgregarCursoProfesorComponent,
    TemasProfesorComponent,
    EjerciciosProfesorComponent,
    ImagenesSuperusuarioComponent,
    InformacionComponent
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxWebstorageModule.forRoot(),

  ],

  providers: [AuthService,GestionProfesores, GestionCursos, GestionEjercicios, GestionCuenta, GestionImagenes],
  bootstrap: [AppComponent]
})
export class AppModule { }
