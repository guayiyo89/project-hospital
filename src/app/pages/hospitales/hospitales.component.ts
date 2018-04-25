import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  constructor( public _hospService: HospitalService, public _modal: ModalUploadService) { }

  ngOnInit() {
    this.listarHospitales();
    this._modal.notificacion.subscribe(resp => {
      this.listarHospitales();
    });
  }

  listarHospitales() {
    this._hospService.cargarHospitales( this.desde ).subscribe(
      (resp: any) => {
        console.log(resp);
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  // borrar Hospital
  borrarHospital(hospital: Hospital) {
    console.log(hospital);

    swal({
      title: 'Alerta!',
      text: 'Estas seguro de borrar a ' + hospital.nombre + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);

      if (borrar) {
        this._hospService.deleteHospital(hospital._id)
          .subscribe( resp => {
            console.log(resp);
            this.listarHospitales();
          });
      }
    });

  }

  // Nuevo Hospital
  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese nombre del nuevo hospital',
      content: 'input',
      buttons: ["Cancelar", "Crear"],
      dangerMode: true
    }).then((valor: string )=> {
      if (!valor || valor.length === 0){
        return;
      }
      this._hospService.crearHospital(valor).subscribe( () => this.listarHospitales() );
    })
  }

  // actualizarHospital
  guardarHospital( hospital: Hospital ) {
    this._hospService.actualizarHospital( hospital ).subscribe();
  }

  // Buscar Hospitales
  buscarHospital( termino: string ) {

    // validacion si no hay palabra en busqueda
    if (termino.length <= 0) {
      this.listarHospitales();
      return;
    }

    this._hospService.buscarHospitales(termino)
    .subscribe( (hospitales: Hospital[]) => {
      console.log(hospitales);
      this.hospitales = hospitales;
    });
  }


  // Modal
  mostrarModal(id: string) {
    this._modal.mostrarModal('hospitales', id);
  }

  cambiarDesde(valor: number) {
    // variable local para comparar
    let desde = this.desde + valor;
    if (desde < 0) {
      return;
    }
    // si el desde sobrepasa el total no hace nada
    if (desde >= this._hospService.total) {
      return;
    }

    // envio el nuevo valor del desde
    this.desde += valor;
    this.listarHospitales();
  }
}
