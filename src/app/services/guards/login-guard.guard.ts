import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _userService: UsuarioService, public router: Router ) {}

  canActivate() {

    if (this._userService.isLogin()) {
      console.log('Paso la Guardia');
      return true;
    } else {
      console.log('Bloqueado');
      this.router.navigate(['/register']);
      return false;
    }
  }
}
