import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos Externos
import { PagesModule } from './pages/pages.module';
import {SharedModule} from './shared/shared.module';
// Servicios
import {ServiceModule} from './services/service.module';

// Rutas
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';
// import { IncrementadorComponent } from './components/incrementador/incrementador.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent
    // IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
