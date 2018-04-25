import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadFileService } from '../../services/uploadFIle/upload-file.service';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class HospitalService {

  total: number = 0;

  hospital: Hospital;

  constructor( public http: HttpClient, public router: Router,
            public _upload: UploadFileService, public _userSrv: UsuarioService ) { }

  // CREAR UN NUEVO HOSPITAL
  crearHospital( nombre: string ) {

    // se apunta a un archivo de config donde reemplazaremos la te localhost por el dominio. Caso en q pase a prod mode
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._userSrv.token;

    return this.http.post( url, {nombre} )
      .map( (resp: any) => {
        swal('Hospital Creado', nombre, 'success');
        return resp.hospital;
      });

  }


  // ACTUALIZAR INFO HOSPITAL
  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._userSrv.token;

    return this.http.put( url, hospital )
      .map( (resp: any) => {
        swal('Hospital Actualizado', hospital.nombre, 'success');
        return true;
      });
  }


  // cargar Hospitales
  cargarHospitales( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
    .map((resp: any) => {
      this.total = resp.total;
      return resp.hospitales;
    });
  }

  buscarHospitales( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospitales);
  }

  // Obtener un Hospital
  getHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.hospital);
  }

  // borrar hospitals
  deleteHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._userSrv.token;
    return this.http.delete(url)
      .map((resp: any) => {
        swal('Borrado Exitoso', 'Se ha borrado el hospital: ' + resp.hospital.nombre, 'success');
        return true;
      });
  }


}
