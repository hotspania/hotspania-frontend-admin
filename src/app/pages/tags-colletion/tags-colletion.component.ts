import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-tags-colletion',
  templateUrl: './tags-colletion.component.html',
  styleUrls: ['./tags-colletion.component.css']
})
export class TagsColletionComponent implements OnInit {
  form:FormGroup;
  data:any=[];
  modal_loading:boolean=false;
  flag:boolean=false;


  constructor(private api:ApiService) {
    this.form=new FormGroup({
      titulo:new FormControl(null,Validators.required),
      _id:new FormControl(null)
    });
   }

   ngOnInit(): void {
    this.getZonas();
  }
  getZonas(){
    this.api.getColletion().subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;
      }
    })
  }

  save(){
    this.modal_loading=true;
    this.api.creatColletion(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.form.reset();
        this.modal_loading=false;
        this.getZonas();
      }
    })
  }

  set(item){
    this.form.setValue(item);
    this.flag=true;
  }

  edit(){
    this.modal_loading=true;
    this.api.editColletion(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.form.reset();
        this.modal_loading=false;
        this.flag=false;
        this.getZonas();
      }
    })
  }

}
