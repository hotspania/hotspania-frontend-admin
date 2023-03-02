import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminsUserService } from '../../services/admins-user.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-admins-user',
  templateUrl: './admins-user.component.html',
  styleUrls: ['./admins-user.component.css']
})
export class AdminsUserComponent implements OnInit {
  form:FormGroup;
  modal_loading:boolean=false;
  data: any=[];
  status:boolean = false
  pas:boolean = false

  constructor(private as:AdminsUserService,private tool:ToolsService ) {
    this.form=new FormGroup({
      _id:new FormControl(null),
      status:new FormControl(null),
      nombre:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      pass:new FormControl(null,Validators.required),
      role:new FormControl(null,Validators.required)
    });
   }

  ngOnInit(): void {
    this.getAll();
  }


  crear(){
    this.modal_loading=true;
    this.as.createAdmin(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getAll();
        this.tool.ShowSuccess();
        this.modal_loading=false;
        this.form.reset();
      }
    })
  }

  
  getAll() {
    this.as.getAdmins().subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
      }
    });
  }

  edit(item) {
    this.status=true;
    this.form.patchValue(item);
  }

  setchange(item){
    this.pas=true;
    this.form.patchValue(item);
  }
  reset(){
    this.pas=false;
    this.status=false;
    this.form.reset();
  }

  save(){
    this.modal_loading=true
    this.as.editAdmin(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getAll();
        this.form.reset();
        this.status=false;
        this.modal_loading=false
        this.tool.ShowSuccess();
      }
    })
  }

  changepassword(){
    this.modal_loading=true
    this.as.changePassword(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getAll();
        this.form.reset();
        this.status=false;
        this.modal_loading=false
        this.tool.ShowSuccess();
      }
    })
  }


}
