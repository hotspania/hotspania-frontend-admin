import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private ls:LocalStorageService) { }

  async getUrl(){
    let city = await this.ls.cargarStorage('city');
    switch (city) {
      case 'rosario':
        
        return  Global.urlRosario;
      
      case 'narnia':
        
        return Global.urlNarnia;

        case 'local':
        
          return Global.urlLocal;  

      default:
        return Global.urlRosario;
    }
  }
}
