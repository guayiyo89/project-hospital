import { Component, OnInit } from '@angular/core';
//import { resolve } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar3().then( () => console.log('Termino wn!')).catch(error => console.error('Error en la promesa', error));

   }

  ngOnInit() {
  }


  contar3(){
    let promesa = new Promise((resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador = contador + 1;
        console.log(contador);
        if(contador === 3){
          resolve(':)');
          clearInterval(intervalo);
        }

      }, 1000);

    });
    return promesa;
  }
}
