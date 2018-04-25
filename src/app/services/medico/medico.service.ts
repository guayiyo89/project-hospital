import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  total: number = 0;
  medicos: Medico;

  constructor( public http: HttpClient, public _userSrv: UsuarioService ) { }

  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
      .map((resp: any) => {
        this.total = resp.total;
        return resp.medicos;
      });
  }

  buscarMedicos( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.medicos);
  }

  deleteMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._userSrv.token;

    return this.http.delete(url)
      .map( (resp: any) => {
        swal('Borrado Exitoso', 'El medico ' + resp.medico.nombre + ' se ha borrado correctamente', 'success');
        return true;
      });
  }

  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.medico);
  }

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizo un medico
      url += '/' + medico._id;
      url += '?token=' + this._userSrv.token;

      return this.http.put(url, medico)
        .map((resp: any) => {
          swal('Medico Actualizado', medico.nombre, 'success');
          return resp.medico;
        });

    } else {
      // creo uno nuevo
      url += '?token=' + this._userSrv.token;
      return this.http.post(url, medico)
          .map( (resp: any) => {
            swal('Medico creado', medico.nombre, 'success');
            return resp.medico;
          });
    }

  }
}
