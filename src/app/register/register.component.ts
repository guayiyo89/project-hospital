import { Component, OnInit, group } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins(); // body...

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _userService: UsuarioService, public router: Router ) { }

  sonIguales( campo1: string, campo2: string ) {
    // esta funcion debe retornar un formGroup
    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ){
        return null;
      }

      return { sonIguales: true };
    };

  }

  ngOnInit() {
    init_plugins();

    // Formulario Reactivo
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2') });
  }

  registrarUser() {

    if ( this.forma.invalid ) {
      // si no es valido el form, no hace nada nadita, naditirijilla
      return;
    }

    // si no has aceptado los terminos
    if ( !this.forma.value.condiciones ){
      console.log( 'Aceptalas o arderas en el infierno ');
      swal('Atención', 'Acepta las condiciones o vete!!', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._userService.crearUsuario(usuario)
      .subscribe( resp => {
        this.router.navigate(['/login']);
      });

    console.log( this.forma.valid );
  }

}
