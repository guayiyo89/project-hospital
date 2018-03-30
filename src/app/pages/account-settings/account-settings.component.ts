import { Component, Inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _settings: SettingsService) { }

  ngOnInit() {
  }


  cambiarColor(color:string, link:any){
  	console.log(link);

  	this.applyCheck(link);
    this._settings.aplicarTema(color);
  }

  applyCheck(link:any){
  	let selectores:any = document.getElementsByClassName('selector');

  	for (let ref of selectores){
  		ref.classList.remove('working');
  	}

  	link.classList.add('working');
  }
}
