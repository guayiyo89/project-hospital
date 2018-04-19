import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/imagen';

    if(!img){
      return url + '/usuario/xxx';
    }

    if( img.indexOf('https') >= 0 ){
      return img;
    }

    switch (tipo){
      case 'usuario':
      url += '/usuarios/' + img;
      break;

      case 'medico':
      url += '/medicos/' + img;
      break;

      case 'hospital':
      url += '/hospitales/' + img;
      break;

      default:
      console.log('tipo de imagen no existe');
      url += '/usuario/xxx';


    }
    return url;
  }

}
