import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-reject-image',
  templateUrl: './reject-image.component.html',
  styleUrls: ['./reject-image.component.css']
})
export class RejectImageComponent implements OnInit {
  @Input()show :boolean=false;
  @Input()data :any=[];
  @Input()tipe :string ="";
  form:FormGroup;
  constructor(private eventos:EventosService,private api:ApiService,private tools:ToolsService) { 
   
    this.form=new FormGroup({
      mensaje:new FormControl(null,Validators.required),
      id:new FormControl(null,Validators.required),
      data:new FormControl(null)
    })

    
  }

  ngOnInit(): void {
  }

  closed(){
    this.eventos.Closing();
  }

  send(){
    this.form.patchValue({id:this.data._id});
    this.api.rechazarImagen(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.tools.ShowSuccess();
        this.eventos.newUpdateAlert();
        setTimeout(() => {
            this.closed();
        }, 200);
      }
    })

  }

  sendTwo(){
    this.form.patchValue({data:this.data});
    this.api.rechazarImagenes(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.tools.ShowSuccess();
        this.eventos.newUpdateAlert();
        setTimeout(() => {
            this.closed();
        }, 200);
      }
    }) 
  }

}
