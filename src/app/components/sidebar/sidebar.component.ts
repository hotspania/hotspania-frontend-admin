import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AdminsUserService } from '../../services/admins-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  city: any;

  constructor(private router:Router,
    private us:AdminsUserService,private route:ActivatedRoute,
    private ls:LocalStorageService) { }

  ngOnInit(): void {
  }



  async nav(url){
    this.city=await this.ls.cargarStorage('city').then(x=>x);
    this.router.navigate([`/home/${this.city}${url}`]);  
   }

   async change(){
    this.router.navigate([`/home`]);  
   }

   Logout(){
     this.us.logout();
     setTimeout(() => {
      this.router.navigate(['/login']);       
     }, 500);
   }

   

}
