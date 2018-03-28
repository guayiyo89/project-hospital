import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modulos Externos
import { PagesModule } from './pages/pages.module';
import {SharedModule} from './shared/shared.module';

//Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
