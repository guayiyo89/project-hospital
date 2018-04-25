import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SidebarService, SharedService,
      UsuarioService, LoginGuardGuard, UploadFileService,
      HospitalService, MedicoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../pages/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [SettingsService, SidebarService, SharedService, HospitalService, MedicoService,
          UsuarioService, LoginGuardGuard, UploadFileService, ModalUploadService]
})
export class ServiceModule { }
