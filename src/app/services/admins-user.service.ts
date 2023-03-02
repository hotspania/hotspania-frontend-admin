import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Global } from './global';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminsUserService {
  public url: String;
  token:string="";

  constructor(private http: HttpClient,private ls:LocalStorageService,private router:Router) {
    this.url = Global.url;
    this.cargarStorage();
  }

  Login(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'adminlogin', data, { headers: headers })
    .pipe(
      map((resp:any)=>{
        this.ls.SaveStorage('usuario',resp.usuarioDB);
        this.ls.SaveStorage('token',resp.token);
        return resp.ok
      })
    )
  }

  createAdmin(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'admincreate', data, { headers: headers });
  }
  editAdmin(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'editadmin', data, { headers: headers });
  }

  changePassword(a): Observable<any> {
    let data = JSON.stringify(a);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'changepasswordadmin', data, { headers: headers });
  }

  getAdmins(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + 'getAlladmin' , { headers: headers });
  }
  CheckEmail(id):Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'admincheck/'+id, { headers: headers });
  }

  logout(){
    this.ls.eliminarStorage('token');
    this.ls.eliminarStorage('usuario');
  }

  checkEmailUser(email: String) {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + 'admincheck/' + email, { headers: headers });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');     
    } else {
      this.token = ''; 
    }
  }

  Logeado() {
    return (this.token.length > 5) ? true : false;
  }







}
