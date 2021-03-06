import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';



const pagesRoutes: Routes = [
	{ 
		path: '',
		component: PagesComponent,
		canActivate: [LoginGuardGuard],
		// tslint:disable-next-line:indent
		children: [
		{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
		{ path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
		{ path: 'progress', component: ProgressComponent, data: { titulo: 'Dashboard' }},
		{ path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficos' }},
		{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Dashboard' }},
		{ path: 'accountset', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Usuario' }},
		{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'Dashboard' }},

		// managements
		{ path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'}},
		{ path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
		{ path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
		{ path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'}},
		{ path: '', redirectTo: '/dashboard', pathMatch: 'full'}
		]
	}
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);