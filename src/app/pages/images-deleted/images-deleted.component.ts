import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Global } from 'src/app/services/global';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-images-deleted',
  templateUrl: './images-deleted.component.html',
  styleUrls: ['./images-deleted.component.css']
})
export class ImagesDeletedComponent implements OnInit {
  
  id: string;
  modal_loading: boolean = false;
  show_confirmation:boolean=false;
  show: boolean=false;
  data: any = [];
  imageUrl:string;
  item:any=[];
  city: any;
  status:string="DELETED";
  tipo:string="profile";
  action:number=null;
  message:string="";


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

  confirmation(item,tipo){
    if(tipo===1){
      this.message='Eliminar';
      this.action=1
    }else{
      this.message='Recuperar';
      this.action=2
    }
    this.show_confirmation=true;
    this.item=item;
  }

  cancel(){
    this.show_confirmation=false;
    this.item=[];
  }


  quitarImagen(){
    this.modal_loading=true;
    
    if(this.action===1){
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
          this.action=null;
          this.show_confirmation=false;
        }
      });
    }else if(this.action===2){
      let a ={
        id:this.item._id,
        status:'ACCEPTED'
      }
      this.api.changestatusimagen(a).subscribe((resp:any)=>{
        if(resp.ok){
          this.modal_loading=false;
          this.tool.ShowSuccess();
          this.getAllImages(this.id,this.status,this.tipo);
          this.item=[];
          this.action=null;
          this.show_confirmation=false;
        }
      });
    }




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
