import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(); // body...
declare const gapi: any; // Google API


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public _userService: UsuarioService) { }

  // tslint:disable-next-line:no-inferrable-types
  recuerdame: boolean = false;
  email: string;

  auth2: any; // Auth de Google

  ngOnInit() {
    init_plugins();
    this.google_init();
    // recoge el email del LS, si es undefined entonces regresa vacio.
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  // Creamos una funcion para inicializar la google APi
  google_init() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '586009976242-m4vclk4cnu878n9g7l2ko5jmqs00kaj5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById( 'btn-google' ) );
    });
  }
  // funcion para obtener el callback
  attachSignIn( element ) {

    this.auth2.attachClickHandler( element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      // obtenemos el token
      let token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle(token).subscribe( () => {
        this.router.navigate(['/dashboard']);
      });

    });

  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }
    
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._userService.login( usuario, forma.value.recuerdame )
      .subscribe(resp => {
        this.router.navigate(['/dashboard']);

      });


  }

}
