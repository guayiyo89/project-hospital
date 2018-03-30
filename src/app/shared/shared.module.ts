import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
	declarations:[
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent
	],
	exports:[
		HeaderComponent,
		SidebarComponent,
		BreadcrumbsComponent		
	],
	imports:[RouterModule, CommonModule]
	})

export class SharedModule { }