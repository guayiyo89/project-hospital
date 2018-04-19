import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  // instruccion hecha en Vanilla JS debido a que ANgular no tiene especificado el manejo de archivos

  uploadImage( archivo: File, tipo: string , id: string){

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen Subida Correctamente');
            // la resp es un string y se pasa a formato JSON para guardarla en la DB
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log('Fallo :(');
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/uploads/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });

  }

}
