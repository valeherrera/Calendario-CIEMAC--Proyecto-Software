import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import * as bootstrap from "bootstrap"
import * as $AB from 'jquery';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { GestionImagenes } from 'src/services/gestionImagenes.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-imagenes-superusuario',
  templateUrl: './imagenes-superusuario.component.html',
  styleUrls: ['./imagenes-superusuario.component.css']
})
export class ImagenesSuperusuarioComponent implements OnInit {

  constructor(private _gestionImagenes: GestionImagenes, private storage: AngularFireStorage, public router: Router, public _authService: AuthService) { }


  @ViewChild('urlImagen') imagenArteActual: ElementRef;
  @ViewChild('urlImagenNueva') imagenNueva: ElementRef;


  public listaImagenes: Array<JSON>;



  //Actualizar la informacion del ejercicio
  public fechaInicioActual: string;
  public fechaFinalActual: string;
  public idDescripcionActual: string;
  public idNombreActual: string;
  public autorActual: string;
  public imagenActual: string;
  public posicionImagen: number;

  //idNombre, idNombreAutor, idDescripcion, fechaInicio, fechaFinal
  //La url que se obtiene de las imagenes
  public urlImagenA: Observable<string>;


  //Mostrar a informacion en el html de la imagen que está subiendo
  public nombreImagenArte: string;
  public id: string;
  public archivo: string;
  public rutaArchivo: string;
  public ref: any;
  public subida: any;
public fotoUsuario:string;

  public mensaje: string;


  ngOnInit() {
    this.fotoUsuario = sessionStorage.getItem("foto");
    console.log(this.listaImagenes);
    this._gestionImagenes.obtenerImagenes().subscribe(
      result => {
        this.listaImagenes = result.data;
        console.log(this.listaImagenes);
      },
      error => {
        console.log(<any>error);
      });
  }

  //Sube la imagen 
  subirImagen(event) {
    this.nombreImagenArte = event.target.files[0].name;
    this.id = Math.random().toString(36).substring(2);
    this.archivo = event.target.files[0];
    this.rutaArchivo = `arte_nacional/${this.id}`;
    this.ref = this.storage.ref(this.rutaArchivo);
    this.subida = this.storage.upload(this.rutaArchivo, this.archivo);
    this.subida.snapshotChanges().pipe(finalize(() => this.urlImagenA = this.ref.getDownloadURL())).subscribe();
  }

  //Guarda la posicion de la imagen para editar o eliminar
  GuardarInformacion(indice: number) {
    this.posicionImagen = indice;
  }

  //Elimina l aimagen
  EliminarImagen() {
    this._gestionImagenes.eliminarImagen(this.posicionImagen).subscribe(
      result => {
        this.listaImagenes = result.data;
        this.MostrarMensaje(result.message);
      },
      error => {
        console.log(<any>error);
      });
  }

  //Muestra los mensajes de respuesta del backend o de error por falta de datos
  MostrarMensaje(mensaje:string){
    alert(mensaje);

  }

  //Agrega una imagen 
  AgregarImagen(idNombre: string, idNombreAutor: string, idDescripcion: string, fechaInicio: string, fechaFinal: string) {
    if (idNombre == "" || idNombre == null || idNombreAutor == "" || idNombreAutor == null || idDescripcion == "" || idDescripcion == null || fechaInicio == "" || fechaInicio == null || fechaFinal == "" || fechaFinal == null || this.nombreImagenArte == "" || this.nombreImagenArte == null) {
      this.MostrarMensaje("Debe rellenar todos los espacio para agregar la imagen")
      
    } else {

      this._gestionImagenes.agregarImagen(idNombre, idNombreAutor, idDescripcion, fechaInicio, fechaFinal, this.imagenArteActual.nativeElement.value).subscribe(
        result => {
          this.listaImagenes = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        });
    }
  }

  //Copia la información de la imagen 
  InformacionImagen(fechaInicio: string, fechaFinal: string, autor: string, descripcion: string, nombre: string, imagen: string, posicion: number) {

    this.fechaInicioActual = fechaInicio;
    this.fechaFinalActual = fechaFinal;
    this.autorActual = autor;
    this.idDescripcionActual = descripcion
    this.idNombreActual = nombre;
    this.imagenActual = imagen;
    this.posicionImagen = posicion;

  }
  
  //Función para salir del sistema
  Salir() {
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);
  }

  //Función para editar la imagen
  EditarInformacion(idNombreNuevo: string, idNombreAutorNuevo: string, idDescripcionNueva: string, fechaInicioNueva: string, fechaFinalNueva: string) {

    var imagenNueva= this.imagenNueva.nativeElement.value;

    if((idNombreNuevo == "" || idNombreNuevo == null ) && ( idNombreAutorNuevo == "" || idNombreAutorNuevo == null) && (idDescripcionNueva == "" || idDescripcionNueva == null) && (fechaInicioNueva == "" || fechaInicioNueva == null )&&( fechaFinalNueva == "" || fechaFinalNueva == null) && this.imagenNueva.nativeElement.value == ""){
      alert("Debe rellenar al menos con un dato");
    }else{
      if (idNombreNuevo == "" || idNombreNuevo == null) {
        idNombreNuevo = this.idNombreActual;
      }
      if (idNombreAutorNuevo == "" || idNombreAutorNuevo == null) {
        idNombreAutorNuevo = this.autorActual;
      }
      if (idDescripcionNueva == "" || idDescripcionNueva == null) {
        idDescripcionNueva = this.idDescripcionActual;
      }
      if (fechaInicioNueva == "" || fechaInicioNueva == null) {
        fechaInicioNueva = this.fechaInicioActual;
      }
      if (fechaFinalNueva == "" || fechaFinalNueva == null) {
        fechaFinalNueva = this.fechaFinalActual;
      }
  
      if (this.imagenNueva.nativeElement.value == "") {
        imagenNueva = this.imagenActual;
      }
      
      this._gestionImagenes.modificarInformacionImagen(idNombreNuevo, idNombreAutorNuevo, idDescripcionNueva, fechaInicioNueva, fechaFinalNueva, imagenNueva, this.posicionImagen).subscribe(
        result => {
          this.listaImagenes = result.data;
          this.MostrarMensaje(result.message);
        },
        error => {
          console.log(<any>error);
        });
    } 
  }
}
