import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public _userService: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
  }

  logout() {
    this._userService.logout();
  }
}
