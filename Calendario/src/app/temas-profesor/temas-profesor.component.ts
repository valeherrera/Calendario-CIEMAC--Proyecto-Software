import { Component, OnInit } from '@angular/core';
import { GestionTemasProfesorService } from 'src/services/gestion-temas-profesor.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-temas-profesor',
  templateUrl: './temas-profesor.component.html',
  styleUrls: ['./temas-profesor.component.css']
})
export class TemasProfesorComponent implements OnInit {
  public nombreTema: string
  public listaTemas: Array<JSON>

  public codigo: string;;
  public periodo: string;
  public anno: string;
  public tema: string;

  public visibleAgregar = true;
  public visibleModificar = false;

  public temaActual: string;
  public mensaje: string;
  public nombreCurso: string;

  public nombreEliminar:string;
  public fotoUsuario:string;

  

  constructor(
    private _gestionTemas: GestionTemasProfesorService,
    public _authService: AuthService,
    public router: Router) { }

  ngOnInit() {

    this.codigo = sessionStorage.getItem("codigo");
    this.periodo = sessionStorage.getItem("periodo");
    this.anno = sessionStorage.getItem("anno");
    this.nombreCurso = sessionStorage.getItem("nombreCurso");
    this.fotoUsuario = sessionStorage.getItem("foto");

    this._gestionTemas.obtenerTemas(this.codigo, this.periodo, this.anno).subscribe(
      result => {
        this.listaTemas = result.data;
        
        console.log(this.listaTemas);
      },
      error => {
        console.log(<any>error);
      });
  }

  //Funcion para salir del sistema
  Salir(){
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);

  }

  //Guarda los datos en el session storage para buscar los ejercicios que tiene un tema
  DatosBusqueda(nombreTema: string){
    sessionStorage.setItem("tema", nombreTema);
    this.router.navigate(['/EjerciciosProfesor']);
  }

  //Cambio los datos para modificar el html
  MostrarVentanaAgregar() {
    this.visibleAgregar = true;
    this.visibleModificar = false;
  }

//Cambio los datos para modificar el html y copia la información del tema
  MostrarVentanaEditar(nombreTema: string) {
    this.temaActual = nombreTema;
    this.visibleAgregar = false;
    this.visibleModificar = true;
  }

  //Función para modificar la información de un tema
  ModificarInformacionTema(tema: string) {

    if (tema == null || tema == "") {
      this.MostrarMensaje("Debe ingresar el tema para modificar la información");
    } else {
      this._gestionTemas.modificarTemas(this.codigo, this.periodo,this.anno, this.temaActual, tema).subscribe(
        result => {
          this.listaTemas = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        }
      )

      this.visibleAgregar = true;
      this.visibleModificar = false;
    }

  }

  //Copia el nombre del tema para eliminarlo
  GuardarInformacion(nombre:string){
    this.nombreEliminar = nombre;
  }

  //Función que elimina un tema
  EliminarTemas() {
     
    this._gestionTemas.eliminarTemas(this.codigo, this.periodo, this.anno, this.nombreEliminar).subscribe(
      result => {
        this.listaTemas = result.data;
        this.MostrarMensaje(result.message);
      },
      error => {
        console.log(<any>error);
      }
    )
    
  }

  //Función que agrega un tema
  AgregarTema(tema: string) {
    console.log(tema);
    if (tema == "" || tema == null) {
      this.MostrarMensaje("Debe llenar todos los espacios para agregar un tema");
    } else {   
      this._gestionTemas.agregarTemas(this.codigo, this.periodo, this.anno, tema).subscribe(
        result => {
          this.listaTemas = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        }
      )
      
    }
  }

  //Muestra los mensajes de respuesta del backen o mensajes de error por falta de datos.
  MostrarMensaje(mensaje: any) {
    alert(this.mensaje = mensaje);
  }
}
