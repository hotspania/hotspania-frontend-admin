import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private router: Router, private us: UserService) {
  }

  canActivate(){
    if(this.us.checkRole()){
      console.log("paso por el guard");
      return true;
    }else{
      console.log("bloqueado");
      this.router.navigate(['/login']);
      return false;
    }  
  }
}
