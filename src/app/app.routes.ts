import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [

	{ path:'login', component: LoginComponent},
	{ path:'register', component: RegisterComponent},
	{ path:'', redirectTo: '/dashboard', pathMatch: 'full'},
	{ path:'**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true});

