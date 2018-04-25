import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { UploadFileService } from '../../services/uploadFIle/upload-file.service';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  usuario: Usuario;

  constructor( public _userService: UsuarioService, public _load: UploadFileService, public _modal: ModalUploadService) {
    console.log('Modalisto');
  }

  ngOnInit() {
  }

  // trabajo con un evento
  seleccionImg( archivo: File ) {
    if (!archivo) {
      return;
    }

    this.imagenSubir = archivo;
  }

  subirImg() {
    // this._userService.cambiarImg( this.imagenSubir, this.usuario._id);
    this._load.uploadImage(this.imagenSubir, this._modal.tipo, this._modal.id)
      .then( resp => {
        console.log(resp);
        this._modal.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(resp => {console.log('Error en la carga');
      });
    console.log('xD');
  }

  cerrarModal() {
    this.imagenSubir = null;

    this._modal.ocultarModal();
  }

}
