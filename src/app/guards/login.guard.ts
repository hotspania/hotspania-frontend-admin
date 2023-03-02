import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminsUserService } from '../services/admins-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {

  constructor(private router: Router, private us: AdminsUserService) {
  }

  canActivate(){
    if(this.us.Logeado()){
      console.log("paso por el guard");
      return true;
    }else{
      console.log("bloqueado");
      this.router.navigate(['/login']);
      return false;
    }  
  }
  
}
