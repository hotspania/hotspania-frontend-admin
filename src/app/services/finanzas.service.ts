import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventosService } from './eventos.service';
import { LocalStorageService } from './local-storage.service';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanzasService {
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

  getStatusFinanzas():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getstatusfinanzas', { headers: headers });
  }
  getPendingUsers():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getpendingsuser', { headers: headers });
  }

  getComprasUser(id:any):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getcompras/'+id, { headers: headers });
  }
  getIngresosUser(id:any):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getingresos/'+id, { headers: headers });
  }

  getLastInputs():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getlastinputs', { headers: headers });
  }
  getLastOutputs():Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'getlastoutputs', { headers: headers });
  }


  setInput(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'addingreso', data, { headers: headers });
  }
  setOutput(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'addcompra', data, { headers: headers });
  }
  deleteRecord(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'correcionfinanzas', data, { headers: headers });
  }

  setStates(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'setstates', data, { headers: headers });
  }

  ajustardias(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'ajustardias', data, { headers: headers });
  }






}
