import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // creamos un arreglo de usuarios vacío
  usuarios: Usuario[] = [];
  // maneja la paginación desde q elemento se muestra
  // esta presente en el backend
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  constructor( public _userService: UsuarioService, public _modal: ModalUploadService ) { }

  ngOnInit() {
    this.listarUsuarios();
    // nos subcribimos a cualquier emission del modla para recargar la lista de usuarios al momento de agregar
    // una nueva imagen
    this._modal.notificacion.subscribe(resp => {
      this.listarUsuarios();
    });
  }

  mostrarModal(id: string) {
    this._modal.mostrarModal('usuarios', id);
  }

  // Lista de todos los ususarios
  listarUsuarios() {
    this.cargando = true;
    this._userService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        console.log(resp);
        this.total = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  //
  cambiarDesde(valor: number) {
    // variable local para comparar
    let desde = this.desde + valor;
    if (desde < 0) {
      return;
    }
    // si el desde sobrepasa el total no hace nada
    if (desde >= this.total) {
      return;
    }

    // envio el nuevo valor del desde
    this.desde += valor;
    this.listarUsuarios();
  }

  // Buscar Usuarios
  buscarUser( termino: string ) {

    // validacion si no hay palabra en busqueda
    if (termino.length <= 0) {
      this.listarUsuarios();
      return;
    }

    this._userService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }

  // Borrar Ususario
  borrarUser(usuario: Usuario) {
    console.log(usuario);

    if (usuario._id === this._userService.usuario._id) {
      swal('Acción Denegada', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Alerta!',
      text: 'Estas seguro de borrar a ' + usuario.nombre + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);

      if (borrar) {
        this._userService.deleteUsuario(usuario._id)
          .subscribe( resp => {
            console.log(resp);
            this.listarUsuarios();
          });
      }
    });

  }

  asignaRole(usuario: Usuario) {
    this._userService.actualizarUsuario(usuario).subscribe(
      resp => {
        console.log(resp);
      });
  }
}
