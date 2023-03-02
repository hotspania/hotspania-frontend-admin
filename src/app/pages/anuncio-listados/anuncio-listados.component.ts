import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-anuncio-listados',
  templateUrl: './anuncio-listados.component.html',
  styleUrls: ['./anuncio-listados.component.css']
})
export class AnuncioListadosComponent implements OnInit {
  modal_loading:boolean=false;
  imagenes:any=[];
  profileImage:string="";
  anuncio: any;
  total:number=0;
  restantes:number=0;
  status:boolean=false;
  listados:any=[];
  data:any=[];
  value1:boolean=false;
  value2:boolean=false;
  value3:boolean=false;
  value4:boolean=false;
  value5:boolean=false;
  id:any="";

  constructor(private api:ApiService,private route:ActivatedRoute,private tools:ToolsService,public eventos:EventosService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProfile(this.id);
  }

  addImagen(event){
    this.profileImage=event;   
  }

  quitarImagen() {
    this.profileImage=null;
  }

  save(){
    this.modal_loading=true;
    let a ={
      imagen:this.profileImage,
      id:this.id,
      listados:this.listados
    }
    this.api.setListados(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.getProfile(this.id);
        this.modal_loading=false;
        this.tools.ShowSuccess();
      }
    })

  }

  update(){}

  getProfile(id){
    this.api.getProfile(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;   
        this.imagenes=this.data.imagenes.map((x:any)=>x);  
        this.profileImage=this.data.imagen;
        this.listados=this.data.listados;
        this.setCheckBox();
      }
    })
  }

  setlistado(event){
    if (this.listados.includes(event)) {
      this.listados = this.listados.filter(a => a !== event);
    } else {
      this.listados = [...this.listados, event];
    }  
  }

  setCheckBox(){

    (this.listados.includes('Lista General'))?(this.value1=true):(this.value1=false);
    (this.listados.includes('disponible'))?(this.value2=true):(this.value2=false);
    (this.listados.includes('Premium'))?(this.value3=true):(this.value3=false);
    (this.listados.includes('V.I.P'))?(this.value4=true):(this.value4=false);
    (this.listados.includes('PROMO'))?(this.value5=true):(this.value5=false);
  }


}
