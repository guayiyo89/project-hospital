import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//modulos
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// pipes
import { PipeModule } from '../pipes/pipe.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
	declarations:[
	PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent,
    IncrementadorComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
	],
	exports:[
	//aqui se colocan las paginas q se van a llamar desde componentes fuera del modulo
	DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficoDonaComponent,
    IncrementadorComponent
	],
	imports:[
	CommonModule,
	RouterModule,
	SharedModule,
	FormsModule,
	ChartsModule,
	PipeModule,
	PAGES_ROUTES
	]
})
export class PagesModule { }