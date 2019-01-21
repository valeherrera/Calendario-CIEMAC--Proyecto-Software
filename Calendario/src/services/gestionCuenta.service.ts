import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GestionCuenta {
    public url = "http://localhost:3000/cuenta";

    constructor(public _http: HttpClient) { }
    
    verificacionCuenta(correo): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url +"/"+ correo, { headers: headers });
    }

    
}