import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { UploadFileService } from '../../services/uploadFIle/upload-file.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _upload: UploadFileService ) {
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

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
      .map( (resp: any) => {

        // si el usuario intenta cambiar por si mismo su ROL
        if (usuario._id === this.usuario._id) {
          // para q se efectue el cambio en el LS
          this.guardadoLs(resp.usuario._id, this.token, resp.usuario );
        }

        swal('Usuario Actualizado', usuario.nombre, 'success');
        return true;
      });
  }

  // es una promesa
  cambiarImg(file: File, id: string) {
    this._upload.uploadImage( file, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Subida Correctamente', this.usuario.nombre, 'success');
        this.guardadoLs(id, this.token, this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  // cargar Usuarios
  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.usuarios);
  }

  // borrar usuarios
  deleteUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map((resp: any) => {
        swal('Borrado Exitoso', 'Se ha borrado el usuario: ' + resp.usuario._id, 'success');
        return true;
      });
  }

}
