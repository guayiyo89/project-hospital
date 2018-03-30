import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

progreso1: number = 50;
progreso2: number = 40;

  constructor() { }

  ngOnInit() {
  }

  //refreshProg( event:number ){
  	//console.log('Recibido', event );
  //}

}
