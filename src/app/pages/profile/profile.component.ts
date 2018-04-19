import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;

  constructor( public _userService: UsuarioService) {
    this.usuario = this._userService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
      console.log(usuario);
      this.usuario.nombre = usuario.nombre;
      // si no es usuario Google se puede cambiar el mail.
      if (!this.usuario.google) {
        this.usuario.email = usuario.email;
      }

      this._userService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          console.log(resp);
        });

  }

  // trabajo con un evento
  seleccionImg( archivo: File ) {
    if (!archivo) {
      return;
    }

    this.imagenSubir = archivo;
  }

  subirImg() {
    this._userService.cambiarImg( this.imagenSubir, this.usuario._id);
  }

}
