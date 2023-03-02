import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  modal_loading:boolean=false;
  data:any=[];
  titulo:string="";
  mensaje:string="";
  admin:any=[];
  
  
  constructor(private api:ApiService,private tool:ToolsService,private ls:LocalStorageService,private eventos:EventosService) {
   this.eventos.closingDialog().subscribe(x=>{
     this.getNotiticas();
     this.tool.ShowSuccess();
   })
   }

  ngOnInit(): void {
    this.getNotiticas();
  }

  async getAdmin() {
    this.admin = await this.ls.cargarStorage('usuario').then((x) => x);
  }

  getNotiticas(){
    this.api.getAllNoticias().subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;
      }
    })
  }

  create(){
    this.modal_loading=true;
    let a ={
      titulo:this.titulo,
      mensaje:this.mensaje,
      admin:this.admin._id
    }
    this.api.createnoticia(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.getNotiticas();
        this.titulo="";
        this.mensaje="";
        this.modal_loading=false;
        this.tool.ShowSuccess();
      }
    })
  }

}
