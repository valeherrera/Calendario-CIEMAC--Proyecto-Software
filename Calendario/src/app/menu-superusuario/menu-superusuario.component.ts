import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-superusuario',
  templateUrl: './menu-superusuario.component.html',
  styleUrls: ['./menu-superusuario.component.css']
})
export class MenuSuperusuarioComponent implements OnInit {

  constructor(public router: Router, public _authService: AuthService) { }
    public usuario: string;
    public fotoUsuario:string;
  

  ngOnInit() {
    this.usuario = sessionStorage.getItem("usuario");
    this.fotoUsuario = sessionStorage.getItem("foto");
    console.log(this.usuario);
  }

  //Función para salir del sistema
  Salir(){
    sessionStorage.clear();
    this._authService.logOut();
    this.router.navigate(['/Login']);

  }
}

