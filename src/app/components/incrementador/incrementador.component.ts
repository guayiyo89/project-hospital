import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {

@Input() leyenda:string = 'Soy Leyenda';
@Input() progreso: number = 50;

@Output() cambioValor: EventEmitter<number> = new EventEmitter();

@ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {
  	console.log('Leyenda:', this.leyenda);
  	console.log('Progreso:', this.progreso);
   }

  ngOnInit() {
  }

  onChanges( newValue:number ){
    //vanilla JS
    //let elemHTML: any = document.getElementsByName('progreso')[0];
    //console.log(this.txtProgress);

    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <= 0){
      this.progreso = 0;
    }else{
      this.progreso = newValue;}
    console.log(newValue);

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

    //elemHTML.value = Number(this.progreso);
  }

  cambiaValor( valor:number ){
  	if (this.progreso >= 100 && valor > 0){
  		this.progreso = 100;
  		return;
  	}

  	if (this.progreso <= 0 && valor < 0){
  		this.progreso = 0;
  		return;
  	}

  	this.progreso = this.progreso + valor;
  	this.cambioValor.emit(this.progreso);
  }

}
