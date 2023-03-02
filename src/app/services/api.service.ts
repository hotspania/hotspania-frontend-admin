import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Global } from './global';
import { EventosService } from './eventos.service';
import { LocalStorageService } from './local-storage.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url: String;
  public city: any;

  constructor(
    private http: HttpClient,
    private eventos: EventosService,
    private ls: LocalStorageService,
    private u: UrlService
  ) {
    this.setURL();
    eventos.listenUrl().subscribe(async (x) => {
      this.setURL();
    });
  }

  async setURL() {
    this.url = await this.u.getUrl().then((x) => x);
  }

  //Fichas
  createFicha(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'usercreate', data, { headers: headers });
  }
  putFakeData(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'fakecreate', data, { headers: headers });
  }
  checkEmailUser(email: String) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'checkemailuser/' + email, { headers: headers });
  }
  changePasswordUser(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'changepassworduser', data, { headers: headers });
  }
  editRealData(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'realuser', data, { headers: headers });
  }
  getFichas(items) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let $params = new HttpParams();
    !!items.name ? ($params = $params.append('name', items.name)) : '';
    !!items.dni ? ($params = $params.set('dni', items.dni)) : '';
    !!items.email ? ($params = $params.set('email', items.email)) : '';
    !!items.whatsapp ? ($params = $params.set('whatsapp', items.whatsapp)) : '';
    !!items.cel ? ($params = $params.set('cel', items.cel)) : '';
    !!items.status
      ? ($params = $params.set('status', items.status))
      : $params.set('status', '0');
    return this.http.get(this.url + 'getprofiles', {
      headers: headers,
      params: $params,
    });
  }
  getFicha(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getprofile/' + id, { headers: headers });
  }
  getallFicha(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getalldata/' + id, { headers: headers });
  }
  getdnidata(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getdnidata/' + id, { headers: headers });
  }
  getImagesUser(id,status,tipo): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getimagesuser/' + id +'/'+status+'/'+ tipo, {
      headers: headers,
    });
  }
  getPendingImagesUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getpendingimagesuser/' + id, {
      headers: headers,
    });
  }


  //specs
  putSpecs(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'pushspecs', data, { headers: headers });
  }

  getSpecs(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getspecs/' + id, { headers: headers });
  }

  //Zones
  createZona(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'savezone', data, { headers: headers });
  }
  editZona(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'editzone', data, { headers: headers });
  }
  getZones(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getzones', { headers: headers });
  }
  deleZone(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'getzones/' + id, { headers: headers });
  }
  //TagsColletion
  creatColletion(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'savetag', data, { headers: headers });
  }
  editColletion(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'edittag', data, { headers: headers });
  }
  getColletion(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'gettags', { headers: headers });
  }
  deleteColletion(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url + 'gettag/' + id, { headers: headers });
  }

  //paquetes

  createPaquete(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'createpaquete', data, {
      headers: headers,
    });
  }
  editPaquete(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url + 'editpaquete', data, { headers: headers });
  }
  getPaquetes(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getpaquetes', { headers: headers });
  }

  //LETRAS
  getLetras(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getletras', { headers: headers });
  }
  crearLetra(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'crearletra', data, { headers: headers });
  }
  asignarLetra(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'asignarletra', data, { headers: headers });
  }



  //Aprobar Imagenes
  cambiarImagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'changeimage', data, { headers: headers });
  }
  changestatusimagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'changestatusimages', data, { headers: headers });
  }
  cambiarAllImagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'changeimages', data, {
      headers: headers,
    });
  }
  downloadAllImagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'downloadallimages', data, {
      headers: headers,
    });
  }

  rechazarImagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'rejectimage', data, { headers: headers });
  }
  rechazarImagenes(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'rejectimages', data, {
      headers: headers,
    });
  }

  deleteImagen(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'deleteimage', data, { headers: headers });
  }

  //Create Profile Anuncios
  createProfile(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'addprofile', data, { headers: headers });
  }
  updateProfile(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'dayaddprofile', data, {
      headers: headers,
    });
  }
  getProfile(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getprofileanuncio/' + id, {
      headers: headers,
    });
  }
  setListados(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'setlistados', data, { headers: headers });
  }
  updateProfilePhotos(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'updateimagesprofile', data, {
      headers: headers,
    });
  }

  //finanzas

  getFinanzasProfile(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getprofilefinanzas/' + id, {
      headers: headers,
    });
  }
  getAllVencimientos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getallvencimientos', { headers: headers });
  }
  getAllProfiles(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getallprofiles', { headers: headers });
  }
  sendmultiplepaquetes(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'addmultiplepaquetes', data, {
      headers: headers,
    });
  }

  activarProfile(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'activarficha', data, { headers: headers });
  }

  ////TAGS SERVICE

  createtag(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'addtag', data, { headers: headers });
  }
  deletetag(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'deletetag', data, { headers: headers });
  }
  getTags(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getags/' + id, { headers: headers });
  }

  //PETICIONES
  getAllPeticiones(query): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getpeticiones/'+query, { headers: headers });
  }
  sendresponsepeticiones(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'editpeticion', data, { headers: headers });
  }

  //NOTICIAS
  getAllNoticias(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getallnoticias', { headers: headers });
  }
  createnoticia(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'createnoticia', data, { headers: headers });
  }
  deletenoticia(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'deletenoticia', data, { headers: headers });
  }

  //LOGINRECORDS
  getAllLoginRecords(id,skip): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getlogin/'+id+'/'+skip, { headers: headers });
  }
  getLoginImageUser(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getloginuser/'+id, { headers: headers });
  }

}
