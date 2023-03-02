import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  @Input() data:any=[];
  status:boolean=false;
  modal_loading:boolean=false;

  constructor(private api:ApiService,private eventos:EventosService) { }

  ngOnInit(): void {
  }

  change(){
    if(this.status){
      this.status=false;
    }else{
      this.status=true;
    }  
  }

  deleteOne(){
    this.modal_loading=true;
    let a={
      id:this.data._id
    }
    this.api.deletenoticia(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.eventos.Closing();
      }
    })
  }

}
