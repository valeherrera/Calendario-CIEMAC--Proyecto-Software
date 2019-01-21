import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GestionTemasProfesorService {

  public url = "http://localhost:3000/temas";

    constructor(public _http: HttpClient) { }
    
    obtenerTemas(codigo, periodo, anno): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.get(this.url +"/"+ codigo+"/"+ periodo+"/"+ anno, { headers: headers });
    }
    
    agregarTemas(codigo, periodo, anno, tema): Observable<any> {
        let params = JSON.stringify({ codigo: codigo, periodo: periodo, anno: anno, tema:tema});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url, params, { headers: headers });
    }
    modificarTemas(codigo, periodo, anno, tema, temaNuevo): Observable<any> {
      let params = JSON.stringify({codigo: codigo, periodo: periodo, anno: anno, tema:tema, temaNuevo: temaNuevo});
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this._http.post(this.url, params, { headers: headers });
    }
    eliminarTemas(codigo, periodo, anno, tema): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "/" + codigo+ "/" + periodo+ "/" + anno+ "/" + tema, { headers: headers });
    }
}
