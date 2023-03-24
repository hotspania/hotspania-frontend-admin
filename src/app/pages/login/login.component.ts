import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AdminsUserService } from '../../services/admins-user.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  modal_loading:boolean=false;


  constructor(private ls:LocalStorageService, private as:AdminsUserService,private router:Router,private tool:ToolsService) {
    this.form=new FormGroup({
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });

   }

  ngOnInit(): void {
    if(window.location.href.includes('localhost')){
      this.ls.SaveStorage('city', 'local');
    }
    this.getInit();
  }

  Login(){
    this.modal_loading=true;
    this.as.Login(this.form.value).subscribe((resp:any)=>{
      if(resp){
        this.modal_loading=false;
        this.tool.ShowLogin();
        this.as.cargarStorage();
        this.router.navigate(['/home']);
      }
    },(error:any)=>{
      this.form.reset();
      this.tool.ShowError("Error usuario o contraseña incorrecta");
      this.modal_loading=false;
    })
  }

  getInit(){
    console.log("hola");

    (this.as.Logeado())?( this.router.navigate(['/home/'])):null
  }

}
