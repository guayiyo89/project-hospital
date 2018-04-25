import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor( public _medicoService: MedicoService) { }

  ngOnInit() {
    this.listarMedicos();
  }

  listarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
      });
  }

  buscarMedico( termino: string ) {
    if (termino.length <= 0) {
      this.listarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
      .subscribe(medicos => {
        this.medicos = medicos;
      });
  }

  borrarMedico( medico: Medico ) {

    swal({
      title: 'Alerta!',
      text: 'Estas seguro de borrar a ' + medico.nombre + '?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log(borrar);

      if (borrar) {
        this._medicoService.deleteMedico(medico._id)
          .subscribe( resp => {
            console.log(resp);
            this.listarMedicos();
          });
      }
    });
  }

}
