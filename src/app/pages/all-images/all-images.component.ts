import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/services/global';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css'],
})
export class AllImagesComponent implements OnInit {
  id: string;
  modal_loading: boolean = false;
  show_confirmation:boolean=false;
  show: boolean=false;
  data: any = [];
  imageUrl:string;
  item:any=[];
  city: any;
  status:string="ACCEPTED";
  tipo:string="original";

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private tool: ToolsService,
    private eventos:EventosService
  ) {
    eventos.closingDialog().subscribe((x:any)=>this.show=false);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllImages(this.id,this.status,this.tipo);
    this.route.params.subscribe(params => {
      this.city = params['city'];
    });   
  }

  getAllImages(id,status,tipo) {
    this.modal_loading = true;
    this.api.getImagesUser(id,status,tipo).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
        this.modal_loading = false;
      }
    });
  }

  confirmation(item){
    this.show_confirmation=true;
    this.item=item;
  }

  cancel(){
    this.show_confirmation=false;
    this.item=[];
  }


  quitarImagen(){
    this.modal_loading=true;
    let a ={
      _id:this.item._id,
      key:this.item.tipo,
      url:this.item.url,
      user:this.item.user
    }
    this.api.deleteImagen(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.tool.ShowSuccess();
        this.getAllImages(this.id,this.status,this.tipo);
        this.item=[];
        this.show_confirmation=false;
      }
    });
  }


  open(item){ 
    this.modal_loading=true;
    this.imageUrl=`${Global.url}img/${item.tipo}/${item.url}`;
    setTimeout(() => {  
      this.modal_loading=false;    
      this.show=true;    
    }, 300);
  }
}
