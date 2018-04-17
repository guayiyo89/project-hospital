import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router ) {
    // llamamos el cargar los datos del LS
    this.loadStorage();
  }
  // funcion q sabe si esta logueado o no (aunq hay bloqueo en el backend)
  isLogin() {
    return (this.token.length > 5) ? true : false;
  }

  // en caso de apretar F5 q no se pierda la info del LS
  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // Guardado en LS
  guardadoLs( id: string, token: string, usuario: Usuario ) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify( usuario ));

      this.usuario = usuario;
      this.token = token;
  }

  // LOG OUT
  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  // LOGIN GOOCLE
  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';

    // mandamos el token como un obj (ES6)
    return this.http.post( url, {token} ).map( (resp: any) => {
      this.guardadoLs(resp.id, resp.token, resp.usuario);
      return true;
    });
  }

  // LOGIN NORMAL
  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .map( (resp: any) => {
      // almaceno en el LSy luego lo envio
      this.guardadoLs( resp.id, resp.token, resp.usuario );

      return true;
    });
  }

  crearUsuario( usuario: Usuario ) {

    // se apunta a un archivo de config donde reemplazaremos la te localhost por el dominio. Caso en q pase a prod mode
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .map( (resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
      });

  }

}
