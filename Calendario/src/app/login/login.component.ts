import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { GestionCuenta } from 'src/services/gestionCuenta.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //public usuario = "herrerarodriguezvaleria27@gmail.com";
  //public usuario = "valeria.herrera073@gmail.com";

  public usuario: string;
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsaurio: string;
  public fotoUsuario: string;
  public tipoCuenta: number;
  public User: any;
  public dia: any;
  public mes: any;
  public anno: any;


  constructor(
    private _gestionCuenta: GestionCuenta,
    public authService: AuthService,
    public router: Router,
    public localStorage: LocalStorage,
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe(
      auth => {
        if (auth) {
          this.usuario = auth.email;
          this.nombreUsuario = auth.displayName;
          this.fotoUsuario = auth.photoURL;
          console.log(this.usuario);
          this.VerificacionLogin();
        }
      }
    )

  }

  //Función que le muestra los correos de google para elegir uno e iniciar sesión
  OnClickLogin() {
    this.authService.loginGoogle()
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err.message));
      
  }

  //Verifica que la cuenta existe y el tipo de cuenta que es
  VerificacionLogin() {
    
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    this.dia = dd;
    this.mes = mm;
    this.anno = yyyy;


    this._gestionCuenta.verificacionCuenta(this.usuario).subscribe(
      result => {
        sessionStorage.setItem("dia", this.dia);
        sessionStorage.setItem("mes", this.mes);
        sessionStorage.setItem("año", this.anno);

        if (result.data == 1) {
          sessionStorage.setItem("usuario", this.usuario);
          sessionStorage.setItem("nombre", this.nombreUsuario);
          sessionStorage.setItem("foto", this.fotoUsuario);
          this.router.navigate(['/MenuSuperusuario']);
        } else if (result.data == 2) {
          sessionStorage.setItem("usuario", this.usuario);
          sessionStorage.setItem("nombre", this.nombreUsuario);
          sessionStorage.setItem("foto", this.fotoUsuario);
          this.router.navigate(['/AgregarCursoProfesor']);
        } else {
          alert("Su cuenta no está registrada en el sistema")
        }
      },
      error => {
        console.log(<any>error);
      }
    )

  }
}
