import { Component, OnInit } from '@angular/core';
import { GestionCursos } from 'src/services/gestionCursos-profesor.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

const provider = new firebase.auth.GoogleAuthProvider();

@Component({
  selector: 'app-agregar-curso-profesor',
  templateUrl: './agregar-curso-profesor.component.html',
  styleUrls: ['./agregar-curso-profesor.component.css']
})
export class AgregarCursoProfesorComponent implements OnInit {

  public isLogin: boolean;
  public nombreUsuario: string;
  public fotoUsuario: string;
  public tipoCuenta: number;

  constructor(
    private _gestionCursos: GestionCursos,
    public _authService: AuthService,
    public router: Router,
  ) {

  }
  public usuario:string;

  public listaCursos: Array<JSON>;
  public listaCursosDisponibles: Array<JSON>;
  public idNombre: string;
  public idCodigo: string;
  public periodo: number;
  public anno: number;
  public annoActual: number;
  public periodoActual: number;

  public periodoAnterior: number;
  public annoAnterior: number;

  public visibleAgregar = false;
  public visibleDisponibles = true;
  public visibleModificar = false;

  public codigoEliminar: string;
  public annoEliminar: string;
  public periodoEliminar: string;

  public codigoActual: string;
  public nombreCursoModificar: string;
  public codigoCursoModificar: string;
  public cursoElegido = false;
  public mensaje: string;

  public diaActualCalendario:any;
  public mesActualCalendario:any;
  public annoActualCalendario:any;

  ngOnInit() {

    this.usuario = sessionStorage.getItem("usuario");
    this.annoActualCalendario = sessionStorage.getItem("año");
    this.fotoUsuario = sessionStorage.getItem("foto");
    
    this._gestionCursos.obtenerCursosDisponibles(this.usuario).subscribe(
      result => {

        this.listaCursosDisponibles = result.data;
        console.log(this.listaCursosDisponibles);
      },
      error => {
        console.log(<any>error);
      }
    )

    this._gestionCursos.obtenerCursos(this.usuario).subscribe(

      result => {
        this.listaCursos = result.data;
        
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  //Salir del sistema
  Salir(){
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);
  }
  
  //Almacena los datos en el session storage para ingresar a la información de un curso en específico
  DatosBusqueda(codigo: string, periodo:string, anno: string, nombre: string){
    sessionStorage.setItem("codigo",codigo);
    sessionStorage.setItem("periodo", periodo);
    sessionStorage.setItem("anno", anno);
    sessionStorage.setItem("nombreCurso", nombre);
    this.router.navigate(['/TemasProfesor']);
  }

  //Guarda la información de un curso para agregarlo a sus cursos
  ElegirCurso(codigo: string, nombre: string, periodo: number, anno: number ) {
    this.periodoAnterior= periodo;
    this.annoAnterior = anno;

    this.idCodigo = codigo;
    this.idNombre = nombre;

    this.visibleDisponibles = false;
    this.visibleAgregar = true;
  }

  //Cambia las variables para que en el html se hagan los cambios necesarios
  MostrarVentanaAgregar() {
    this.visibleAgregar = true;
    this.visibleDisponibles = false;
    this.visibleModificar = false;
  }

  //Cambia las variables para que en el html se hagan los cambios necesarios
  MostrarVentanaDisponibles() {
    this.visibleAgregar = false;
    this.visibleModificar = false;
    this.visibleDisponibles = true;

  }
  //Función que muestra los mensajes que recibe del backend o un error por falta de datos.
  MostrarMensaje(mensaje: any) {
    alert(mensaje);
    
  }
  //Cambia las variables para que en el html se hagan los cambios necesarios y copia la información
  //de un curso por el motivo de si no edita todo la informacion 
  MostrarVentanaEditar(codigo: string, curso: string, periodoActual: number, annoActual: number) {
    this.visibleDisponibles = false;
    this.visibleAgregar = false;
    this.visibleModificar = true;

    this.codigoCursoModificar = codigo;
    this.nombreCursoModificar = curso;
    this.periodoActual = periodoActual;
    this.annoActual = annoActual;
  }

  //Función que modifica la información de un curso
  ModificarInformacionCurso(periodo: number, anno: number) {

    if (periodo == null) {
      console.log("Debe ingresar el período para modificar la información");
    } else if (anno == null) {
      console.log("Debe ingresar un año para modificar la información");
    } else {
      this._gestionCursos.modificarInformacionCurso(this.codigoCursoModificar, this.periodoActual, this.annoActual, periodo, anno, this.usuario).subscribe(
        result => {
          this.listaCursos = result.data;

          console.log(this.listaCursos);
        },
        error => {

          console.log(<any>error);
        }
      )

      this.visibleDisponibles = true;
      this.visibleModificar = false;

    }

  }

  //Copia la información de un curso para eliminarlo
  GuardarInformacion(codigo:string, periodo:string,anno:string){
    this.codigoEliminar= codigo;
    this.annoEliminar=anno;
    this.periodoEliminar= periodo;
  }

  //Función que elimina un curso
  EliminarCurso() {
    this._gestionCursos.eliminarCursos(this.codigoEliminar, this.usuario, this.periodoEliminar, this.annoEliminar).subscribe(
      result => {
        this.listaCursos = result.data;
        this.MostrarMensaje(result.message);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Función para agregar un curso
  AgregarCurso(codigo: string, nombre: string, periodo: number, anno: number, chkRestaurar: any) {
    
    if (codigo == "" || codigo == null && nombre == "" || nombre == null || periodo == null || anno == null) {
      alert("Debe llenar todos los espacios para agregar un curso");
    } else {
      if(periodo>3 || periodo < 1 || anno < this.annoActualCalendario){
        if(periodo>3 || periodo < 1){
          alert("Solo puede agregar 1: Semestre 1, 2: Semestre 2, 3: Verano");
        }
        if(anno < this.annoActualCalendario){
          alert("Debe agregar un año igualo o superior al actual");
        }
      }
      else{
        this._gestionCursos.agregarCursos(nombre, codigo, this.usuario, periodo, anno, chkRestaurar, this.periodoAnterior, this.annoAnterior).subscribe(
          result => {
            this.listaCursos = result.data;
            this.mensaje = result.message;
            this.MostrarMensaje(result.message);
          },
          error => {
            console.log(<any>error);
          }
        )
      }
    }
    this.visibleAgregar = false;
    this.visibleDisponibles = true;
  }
}
