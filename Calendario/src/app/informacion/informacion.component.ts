import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import * as bootstrap from "bootstrap"
import * as $AB from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  public fotoUsuario:string;

  constructor(public router: Router, public _authService: AuthService) { }

  ngOnInit() {
    this.fotoUsuario = sessionStorage.getItem("foto");
  }

  //Función para salir del sistema
  Salir() {
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);
  }

}
