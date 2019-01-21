import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GestionProfesores {
    public url = "http://localhost:3000/profesores";

    constructor(public _http: HttpClient) { }


    obtenerProfesores(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url, { headers: headers });
    }

    agregarProfesores(nombre, correo): Observable<any> {
        let params = JSON.stringify({ nombre: nombre, correo: correo });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url, params, { headers: headers });
    }
    eliminarProfesor(correo): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "/" + correo, { headers: headers });
    }

    modificarInformacionProfesor(correo, correoNuevo, nombreNuevo ): Observable<any> {
        let params = JSON.stringify({ correo: correo, correoNuevo: correoNuevo, nombreNuevo: nombreNuevo});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, { headers: headers });
    }
}