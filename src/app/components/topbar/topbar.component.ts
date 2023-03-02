import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { AdminsUserService } from '../../services/admins-user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  usuario:any=[];
  city: any="";
  constructor(private ls:LocalStorageService,private us:AdminsUserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser(){
    this.usuario= await this.ls.cargarStorage('usuario').then(resp=>resp);
    this.city= await this.ls.cargarStorage('city').then(resp=>resp);

  }

  Logout(){
    this.us.logout();
  }

}
