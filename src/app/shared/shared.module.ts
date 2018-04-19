import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
// pipes
import { PipeModule } from '../pipes/pipe.module';

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
	imports:[RouterModule, CommonModule, PipeModule]
	})

export class SharedModule { }