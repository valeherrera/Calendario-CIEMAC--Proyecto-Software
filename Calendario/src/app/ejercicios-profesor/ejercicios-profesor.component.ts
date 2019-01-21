import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GestionEjercicios } from 'src/services/gestionEjercicios-profesor.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import * as bootstrap from "bootstrap"
import * as $AB from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ejercicios-profesor',
  templateUrl: './ejercicios-profesor.component.html',
  styleUrls: ['./ejercicios-profesor.component.css']
})

export class EjerciciosProfesorComponent implements OnInit {

  constructor(private _gestionEjercicios: GestionEjercicios, private storage: AngularFireStorage, public router: Router, public _authService: AuthService) { }

  @ViewChild('urlImagenPl') imagenPlanteamiento: ElementRef;
  @ViewChild('urlImagenPr') imagenProblema: ElementRef;
  @ViewChild('urlImagenS') imagenSolucion: ElementRef;

  @ViewChild('urlImagenPlNueva') imagenPlanteamientoNueva: ElementRef;
  @ViewChild('urlImagenPrNueva') imagenProblemaNueva: ElementRef;
  @ViewChild('urlImagenSNueva') imagenSolucionNueva: ElementRef;

  //public usuario = "profesor1@gmail.com";
  public listaEjercicios: Array<JSON>;
  public visibleEditar = false;
  public codigo: string;
  public periodo: string;
  public anno: string;
  public tema: string;
  public nombreCurso: string;
  public fotoUsuario:string;

  //Actualizar la informacion del ejercicio
  public fechaEjercicioActual: string;
  public posicionEjercicio: number;
  public nombreEjercicio: string;
  public idImagenPlanteamientoActual: string;
  public idImagenProblemaActual: string;
  public idImagenSolucionActual: string;
  public advertencia = false;

  //La url que se obtiene de las imagenes
  public urlImagenPlanteamiento: Observable<string>;
  public urlImagenProblema: Observable<string>;
  public urlImagenSolucion: Observable<string>;

  //Mostrar a informacion en el html de la imagen que está subiendo
  public nombreImagenProblema: string;
  public nombreImagenPlanteamiento: string;
  public nombreImagenSolucion: string;

  public mensaje: string;


  ngOnInit() {
    this.codigo = sessionStorage.getItem("codigo");
    this.periodo = sessionStorage.getItem("periodo");
    this.anno = sessionStorage.getItem("anno");
    this.tema = sessionStorage.getItem("tema");
    this.nombreCurso = sessionStorage.getItem("nombreCurso");
    this.fotoUsuario = sessionStorage.getItem("foto");

    this._gestionEjercicios.obtenerEjercicios(this.codigo, this.periodo, this.anno, this.tema).subscribe(
      result => {
        this.listaEjercicios = result.data;
      },
      error => {
        console.log(<any>error);
      });
  }

  //Funcion para salir del sistema
  Salir() {
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);
  }


  //Funcion para subir imagen de planteamiento
  subirImagenPlanteamiento(event) {

    this.nombreImagenPlanteamiento = event.target.files[0].name;
    const id = Math.random().toString(36).substring(2);
    const archivo = event.target.files[0];
    const rutaArchivo = `ejercicios/ejercicio_${id}`;
    const ref = this.storage.ref(rutaArchivo);
    const subida = this.storage.upload(rutaArchivo, archivo);
    subida.snapshotChanges().pipe(finalize(() => this.urlImagenPlanteamiento = ref.getDownloadURL())).subscribe();
  }

  //Funcion para subir imagen de problema
  subirImagenProblema(event) {

    this.nombreImagenProblema = event.target.files[0].name;
    const id = Math.random().toString(36).substring(2);
    const archivo = event.target.files[0];
    const rutaArchivo = `ejercicios/ejercicio_${id}`;
    const ref = this.storage.ref(rutaArchivo);
    const subida = this.storage.upload(rutaArchivo, archivo);
    subida.snapshotChanges().pipe(finalize(() => this.urlImagenProblema = ref.getDownloadURL())).subscribe();
  }

  //Funcion para subir imagen de solución
  subirImagenSolucion(event) {
    this.nombreImagenSolucion = event.target.files[0].name;
    const id = Math.random().toString(36).substring(2);
    const archivo = event.target.files[0];
    const rutaArchivo = `ejercicios/ejercicio_${id}`;
    const ref = this.storage.ref(rutaArchivo);
    const subida = this.storage.upload(rutaArchivo, archivo);
    subida.snapshotChanges().pipe(finalize(() => this.urlImagenSolucion = ref.getDownloadURL())).subscribe();
  }

  //Copia la información de un ejercicio
  InformacionEjercicio(fecha: string, posicion: number, nombre: string, imagenPlanteamiento: string, imagenProblema: string, imagenSolucion: string) {
    this.fechaEjercicioActual = fecha;
    this.posicionEjercicio = posicion;
    this.nombreEjercicio = nombre;
    this.idImagenPlanteamientoActual = imagenPlanteamiento;
    this.idImagenProblemaActual = imagenProblema;
    this.idImagenSolucionActual = imagenSolucion;
  }

  //Muestra los mensajes que vienen del backend o errores por falta de datos
  MostrarMensaje(mensaje: any) {
    this.mensaje = mensaje;
    alert(this.mensaje);

  }

  //Guarda la posicion de un ejercicio para eliminarllo
  GuardarInformacion(posicion: number) {
    this.posicionEjercicio = posicion;
  }

  //Elimina el ejercicio
  EliminarEjercicio() {

    this._gestionEjercicios.eliminarEjercicio(this.codigo, this.periodo, this.anno, this.tema, this.posicionEjercicio).subscribe(
      result => {
        this.listaEjercicios = result.data;
        this.MostrarMensaje(result.message);
      },
      error => {
        console.log(<any>error);
      });

  }

  //Agrega un ejercicio a un curso
  AgregarEjercicio(fechaEjercicio: string, idNombreEjercicio: string) {

    if (fechaEjercicio == "" || fechaEjercicio == null || idNombreEjercicio == "" || idNombreEjercicio == null || this.imagenPlanteamiento.nativeElement.value == "" || this.imagenProblema.nativeElement.value == "" || this.imagenSolucion.nativeElement.value == "") {
      this.MostrarMensaje("Debe rellenar todos los datos para poder agregar el ejercicio");
    }
    else {
      this._gestionEjercicios.agregarEjercicio(fechaEjercicio, idNombreEjercicio, this.imagenPlanteamiento.nativeElement.value, this.imagenProblema.nativeElement.value, this.imagenSolucion.nativeElement.value, this.codigo, this.periodo, this.anno, this.tema).subscribe(
        result => {
          this.listaEjercicios = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        });
    }
  }

  //Edita la información del ejercicio
  EditarInformacion(fechaEjercicio: string, idNombreEjercicio: string) {

    var nuevaImagenPlanteamiento: string;
    var nuevaImagenProblema: string;
    var nuevaImagenSolucion: string;

    if (this.imagenPlanteamientoNueva.nativeElement.value == "" &&
      this.imagenProblemaNueva.nativeElement.value == "" &&
      this.imagenSolucionNueva.nativeElement.value == "" &&
      (fechaEjercicio == "" || fechaEjercicio == null) &&
      (idNombreEjercicio == "" || idNombreEjercicio == null)
    ) {
      this.MostrarMensaje("Debe ingresar al menos un dato para editar el ejercicio");
    } else {

      if (fechaEjercicio == "" || fechaEjercicio == null) {
        fechaEjercicio = this.fechaEjercicioActual;
      }
      if (idNombreEjercicio == "" || idNombreEjercicio == null) {
        idNombreEjercicio = this.nombreEjercicio;
      }

      if (this.imagenPlanteamientoNueva.nativeElement.value == "") {
        nuevaImagenPlanteamiento = this.idImagenPlanteamientoActual;
      }
      else {
        nuevaImagenPlanteamiento = this.imagenPlanteamientoNueva.nativeElement.value;
      }

      if (this.imagenProblemaNueva.nativeElement.value == "") {
        nuevaImagenProblema = this.idImagenProblemaActual;
      }
      else {
        nuevaImagenProblema = this.imagenProblemaNueva.nativeElement.value;
      }

      if (this.imagenSolucionNueva.nativeElement.value == "") {
        nuevaImagenSolucion = this.idImagenSolucionActual;
      }
      else {
        nuevaImagenSolucion = this.imagenSolucionNueva.nativeElement.value;
      }

      this._gestionEjercicios.modificarInformacionEjercicio(fechaEjercicio, idNombreEjercicio, nuevaImagenPlanteamiento, nuevaImagenProblema, nuevaImagenSolucion, this.codigo, this.periodo, this.anno, this.tema, this.posicionEjercicio).subscribe(
        result => {
          this.listaEjercicios = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        });
    }
  }
}


