import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';
import { ToolsService } from '../../services/tools.service';
import { EventosService } from '../../services/eventos.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {
  @Input()show:boolean=false;
  url:string;
  @Input()data :any=[];
  @Input()tipe :string=""; 
  @Input()id : string="";

  constructor(private tools:ToolsService,private eventos:EventosService,private api:ApiService) { }

  ngOnInit(): void { 
  }

  download(){ 
    this.url= `${Global.url}download/${this.data?.tipo}/${this.data?.url}`;  
    window.open(this.url,'_blank');
  }

  closed(){
    this.eventos.Closing();
  }

  accepted(){
    this.api.cambiarImagen(this.data).subscribe((resp:any)=>{
      if(resp.ok){
        this.tools.ShowSuccess();
        this.eventos.newUpdateAlert();
      }
    })  
  }
  acceptedAll(){
    let a={
      data:this.data
    }
    this.api.cambiarAllImagen(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.data=[];
        this.id="";
        this.tipe="";
        this.tools.ShowSuccess();
        this.eventos.newUpdateAlert();
      }
    })  
  }
  downloadAll(){
    let a={
      data:this.data,
      id:this.id
    }
    this.api.downloadAllImagen(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.url= `${Global.url}download/zip/${resp.id}.zip`;  
        window.open(this.url,'_blank');
        this.data=[];
        this.id="";
        this.tipe="";
        this.tools.ShowSuccess();
        this.eventos.newUpdateAlert();
      }
    })  
  }


  



}
