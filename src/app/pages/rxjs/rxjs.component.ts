import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObs().retry(3)
    .subscribe(
      numero => console.log('Subs: ', numero),
      error => console.error('Fallo!', error),
      () => console.log('Se finalizo tu observable')
    );

   }

  ngOnInit() {
  }

  regresaObs(): Observable<number> {
    return new Observable(observer => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador += 1;
        observer.next( contador );

        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
       }

        if ( contador === 2 ) {

          observer.error('Ayudia!');
        }
      }, 1000 );

    }
    );
  }

}
