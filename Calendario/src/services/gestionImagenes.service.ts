import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GestionImagenes {
    public url = "http://localhost:3000/imagenes";

    constructor(public _http: HttpClient) { }

    obtenerImagenes(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url +"/", { headers: headers });
    }
    agregarImagen(idNombre, idNombreAutor, idDescripcion ,fechaInicio,fechaFinal,imagenArteActual): Observable<any> {
        let params = JSON.stringify({ idNombre: idNombre, idNombreAutor: idNombreAutor, idDescripcion:idDescripcion ,fechaInicio:fechaInicio,fechaFinal:fechaFinal, imagenArteActual: imagenArteActual});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url, params, { headers: headers });
    }
    eliminarImagen(posicionImagen): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "/" + posicionImagen, { headers: headers });
    }
    modificarInformacionImagen(idNombreNuevo, idNombreAutorNuevo, idDescripcionNueva, fechaInicioNueva, fechaFinalNueva, imagenNueva, posicionImagen): Observable<any> {
        let params = JSON.stringify({idNombreNuevo:idNombreNuevo, idNombreAutorNuevo:idNombreAutorNuevo, idDescripcionNueva:idDescripcionNueva, fechaInicioNueva:fechaInicioNueva, fechaFinalNueva:fechaFinalNueva, imagenNueva:imagenNueva, posicionImagen:posicionImagen});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, { headers: headers });
    }

}