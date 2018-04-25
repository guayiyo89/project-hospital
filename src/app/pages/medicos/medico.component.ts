import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', ''); // en el modelo todo es opcional
  hospital: Hospital = new Hospital('');

  constructor(public _medicoSrv: MedicoService, public _hospitalSrv: HospitalService,
         public router: Router, public _route: ActivatedRoute, public _modal: ModalUploadService)
         {
           _route.params.subscribe(params => {
             let id = params['id']; // lo reconoce desde la hoja de rutas

             if (id !== 'nuevo') {
              this.getMedico(id);
             }

             this.hospital._id = this.medico.hospital;
           });
         }

  ngOnInit() {
    this._hospitalSrv.cargarHospitales()
      .subscribe( hospitales => {
        this.hospitales = hospitales;
      });
    
    this._modal.notificacion.subscribe(resp => {
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico( f: NgForm ) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }

    this._medicoSrv.guardarMedico(this.medico)
      .subscribe( medico => {
        console.log(medico);
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  // Funcion que muestra el hosptal seleccionado
  cambioHospital( id ) {
    // recibimos el id del hospital
    this._hospitalSrv.getHospital(id)
      .subscribe(hospital => {
        this.hospital = hospital;
      });
  }

  getMedico( id: string ) {
    this._medicoSrv.cargarMedico(id)
      .subscribe(medico => {
        console.log(medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(medico.hospital);
      });
  }

  cambiarFoto() {
    this._modal.mostrarModal('medicos', this.medico._id);
  }

}
