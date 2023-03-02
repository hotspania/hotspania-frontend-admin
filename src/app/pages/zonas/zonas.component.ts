import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
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
    this.api.getZones().subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;
      }
    })
  }

  save(){
    this.modal_loading=true;
    this.api.createZona(this.form.value).subscribe((resp:any)=>{
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
    this.api.editZona(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.form.reset();
        this.modal_loading=false;
        this.flag=false;
        this.getZonas();
      }
    })
  }

  

}
