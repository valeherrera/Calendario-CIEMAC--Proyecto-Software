import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GestionEjercicios {
    public url = "http://localhost:3000/ejercicios";

    constructor(public _http: HttpClient) { }

    obtenerEjercicios(codigo, periodo, anno ,tema): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url +"/"+ codigo+"/"+ periodo+"/"+ anno+"/"+ tema, { headers: headers });
    }

    modificarInformacionEjercicio(fechaEjercicio, idNombreEjercicio, imagenPlanteamiento, imagenProblema, imagenSolucion, codigo, periodo, anno,tema, posicion): Observable<any> {
        let params = JSON.stringify({  fechaEjercicio: fechaEjercicio,idNombreEjercicio: idNombreEjercicio, imagenPlanteamiento: imagenPlanteamiento, imagenProblema: imagenProblema, imagenSolucion: imagenSolucion, codigo: codigo, periodo:periodo, anno:anno, tema:tema, posicion:posicion});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, params, { headers: headers });
    }

    agregarEjercicio(fechaEjercicio, idNombreEjercicio, imagenPlanteamiento, imagenProblema, imagenSolucion, codigo, periodo, anno,tema): Observable<any> {
        let params = JSON.stringify({  fechaEjercicio: fechaEjercicio,idNombreEjercicio: idNombreEjercicio, imagenPlanteamiento: imagenPlanteamiento, imagenProblema: imagenProblema, imagenSolucion: imagenSolucion, codigo: codigo, periodo:periodo, anno:anno, tema:tema});
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url, params, { headers: headers });
    }

    eliminarEjercicio(codigo, periodo, anno, tema, posicionEjercicio): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + "/" + codigo +"/"+ periodo +"/"+ anno+"/"+ tema+"/"+ posicionEjercicio, { headers: headers });
    }
    
}