import { Component, OnInit } from '@angular/core';
import { GestionProfesores } from 'src/services/gestionProfesores-superusuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profesores-superusuario',
  templateUrl: './profesores-superusuario.component.html',
  styleUrls: ['./profesores-superusuario.component.css']
})
export class ProfesoresSuperusuarioComponent implements OnInit {

  constructor(private _gestionProfesores: GestionProfesores, public router: Router, public _authService: AuthService) { }

  public listaProfesores: Array<JSON>;
  public idNombre: string;
  public idCorreo: string;
  public editar: true;
  public usuario: string;

  public correoActual: string;
  public nombreActual: string;

  public visibleAgregar = true;
  public visibleEditar = false;
  public mensaje: string;
  public eliminarInfo: string;
  public fotoUsuario:string;


  ngOnInit() {
    this.usuario = sessionStorage.getItem("usuario");
    this.fotoUsuario = sessionStorage.getItem("foto");

    this._gestionProfesores.obtenerProfesores().subscribe(
      result => {
        this.listaProfesores = result.data;
        console.log(this.listaProfesores);
      },
      error => {
        console.log(<any>error);
      }
    )

  }

  //Función para salir del sistema
  Salir() {
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);

  }


  //Mostrar mensajes de respuesta del backend o de error por falta de datos
  MostrarMensaje(mensaje: any) {
    this.mensaje = mensaje;
    alert(this.mensaje);
  }

  //Cambio de variables para que se modifique el html
  MostrarVentanaAgregar() {
    this.visibleAgregar = true;
    this.visibleEditar = false;
  }

//Cambio de variables para que se modifique el html
  MostrarVentanaEditar(correo: string, nombre: string) {
    this.correoActual = correo;
    this.nombreActual = nombre;

    this.visibleEditar = true;
    this.visibleAgregar = false;

  }

  //Copiar el correo para después eliminar la información del profesor
  GuardarInformacion(correo: string) {
    this.eliminarInfo = correo;
  }

  //Función que elimina la información de un profesor
  EliminarProfesor() {

    this._gestionProfesores.eliminarProfesor(this.eliminarInfo).subscribe(
      result => {
        this.listaProfesores = result.data;
        this.MostrarMensaje(result.message);
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  //Modifica la información de un profesor
  ModificarProfesores(correoNuevo: string, nombreNuevo: string) {
    var correoEditar: string;
    var nombreEditar: string;

    if ((nombreNuevo == null || nombreNuevo == "") && (correoNuevo == null || correoNuevo == "")) {
      alert("Debe agregar como mínimo un nombre o correo para editar la información del profesor. ");
    } else {

      if (nombreNuevo == null || nombreNuevo == "") {
        alert("Se va a editar la información con el nombre: " + this.nombreActual + ". ");
        nombreEditar = this.nombreActual;
      }
      else {
        nombreEditar = nombreNuevo;
      }
      if (correoNuevo == null || correoNuevo == "") {
        alert("Se va a editar la información con el correo: " + this.correoActual + ". ");
        correoEditar = this.correoActual;
      } else {
        correoEditar = correoNuevo;
      }
      var res = correoEditar.split("@");
      if (res.length == 1 || res.length > 2) {
        alert("Debe agregar el formato correcto de correo");
      } else {

        if (res[1] != "gmail.com") {
          alert("Debe agregar el formato correcto de correo");

        } else {

          this._gestionProfesores.modificarInformacionProfesor(this.correoActual, correoEditar, nombreEditar).subscribe(
            result => {
              this.listaProfesores = result.data;
              this.MostrarMensaje(result.message);
              this.visibleAgregar = false;
              this.visibleEditar = true;
            },
            error => {
              console.log(<any>error);
            }
          )
        }
      }
    }
  }


  //Agrega la información de un profesor
  AgregarProfesor(nombre: string, correo: string) {

    if (nombre == null || nombre == "") {
      if (correo == null || correo == "") {
        alert('Debe agregar un nombre y correo para agregar la información del profesor.')
      }
      else {
        alert('Debe agregar un nombre para agregar la información del profesor.')
      }
    } else if (correo == null || correo == "") {
      alert('Debe agregar un correo para agregar la información del profesor.')
    } else {
      var res = correo.split("@");
      if (res.length == 1 || res.length > 2) {
        alert("Debe agregar el formato correcto de correo");
      } else {

        if (res[1] != "gmail.com") {
          alert("Debe agregar el formato correcto de correo");

        } else {
          this._gestionProfesores.agregarProfesores(nombre, correo).subscribe(
            result => {
              this.listaProfesores = result.data;
              this.MostrarMensaje(result.message);
            },
            error => {
              console.log(<any>error);
            }
          )
        }
      }
    }
  }
}
