import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { AdminsUserService } from '../../services/admins-user.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  usuario:any=[];
  city: any="";
  public notifications:any;
  constructor(private router:Router, private ls:LocalStorageService, private us:AdminsUserService, private api:ApiService) { }

  ngOnInit(): void {
    this.getUser();
    this.getNotifications();
  }

  async nav(url){
    this.city=await this.ls.cargarStorage('city').then(x=>x);
    console.log(this.city);
    this.router.navigate([`/home/${this.city}${url}`]);  
   }

  async getUser(){
    this.usuario= await this.ls.cargarStorage('usuario').then(resp=>resp);
    this.city= await this.ls.cargarStorage('city').then(resp=>resp);
  }

  private async getNotifications(){
    await this.api.getNotifications().toPromise().then((resp:any)=>{
      if(resp.ok){
        this.notifications = resp.data;
      }
    });
  }

  public deleteAllNotifications(){
    this.api.deleteAllNotifications().toPromise().then((resp:any)=>{
      if(resp.ok){
        console.log('hecho', resp.message);
      }
      location.reload();
    });
  }

  Logout(){
    this.us.logout();
  }

}
