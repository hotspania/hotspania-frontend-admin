import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolsService } from 'src/app/services/tools.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css'],
})
export class PaquetesComponent implements OnInit {
  data: any = [];
  form: FormGroup;
  status:boolean=false;
  modal_loading:boolean=false;

  constructor(private api: ApiService,private tool:ToolsService) {
    this.form= new FormGroup({
      _id: new FormControl(null),
      clase: new FormControl(null,Validators.required),
      titulo: new FormControl(null,Validators.required),
      price: new FormControl(null,Validators.required),
      days: new FormControl(null,Validators.required),
      status: new FormControl(null),
      fecha_creacion: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getPaquetes().subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
      }
    });
  }

  edit(item) {
    this.status=true;
    this.form.patchValue(item);
  }

  save(){
    this.modal_loading=true
    this.api.editPaquete(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.getAll();
        this.form.reset();
        this.status=false;
        this.modal_loading=false
        this.tool.ShowSuccess();
      }
    })
  }

  crear(){
    this.modal_loading=true
    this.api.createPaquete(this.form.value).subscribe((resp:any)=>{
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
