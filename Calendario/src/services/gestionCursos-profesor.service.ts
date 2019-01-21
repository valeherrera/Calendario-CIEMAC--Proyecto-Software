import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GestionCursos {
    public url = "http://localhost:3000/cursos";

    constructor(public _http: HttpClient) { }

    obtenerCursos(correo): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url +"/"+ correo, { headers: headers });
    }
   
    obtenerCursosDisponibles(correo): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url +"/"+"cursosDisponibles"+"/"+ correo, { headers: headers });
    }

    eliminarCursos(codigoCurso, correo, periodo, anno): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "/" + codigoCurso +"/"+ correo +"/"+ periodo+"/"+ anno, { headers: headers });
    }

    agregarCursos(nombre, codigo, correo, periodo, anno, chkRestaurar, periodoAnterior, annoAnterior): Observable<any> {
        let params = JSON.stringify({ nombre: nombre, codigo: codigo, correo: correo, periodo: periodo, anno:anno, chkRestaurar:chkRestaurar, periodoAnterior: periodoAnterior, annoAnterior: annoAnterior });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url, params, { headers: headers });
    }

    modificarInformacionCurso(codigo, periodoActual, annoActual ,periodo, anno, correo): Observable<any> {
        let params = JSON.stringify({  codigo: codigo,periodoAcutual: periodoActual, annoActual: annoActual, periodo: periodo, anno: anno, usuario: correo });
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, { headers: headers });
    }
    
}