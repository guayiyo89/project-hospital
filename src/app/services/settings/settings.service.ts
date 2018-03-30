import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
  	temaUrl: 'assets/css/colors/default.css',
  	tema: 'default'
  }
  constructor(@Inject(DOCUMENT) private _document) {
  	this.cargarAjustes();
  }

  guardarAjustes(){
  	console.log('guardado en el LS');
  	localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
  	if(localStorage.getItem('ajustes')){
  		this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
  		console.log('cargado en el LS');
  		this.aplicarTema(this.ajustes.tema);
  	}else{
  		console.log('load default');
  	}
  }

  aplicarTema(tema:string){

  	let urlTema = `assets/css/colors/${ tema }.css`;
  	this._document.getElementById('tema').setAttribute('href', urlTema);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = urlTema;

    this.guardarAjustes();
  }

}

interface Ajustes {
	temaUrl: string;
	tema: string;
}