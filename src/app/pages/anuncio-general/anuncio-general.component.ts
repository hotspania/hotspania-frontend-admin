import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-anuncio-general',
  templateUrl: './anuncio-general.component.html',
  styleUrls: ['./anuncio-general.component.css'],
})
export class AnuncioGeneralComponent implements OnInit {
  id: string = '';
  imagenes: any = [];
  available_images:any=[];
  profileImages: any = [];
  paquetes: any = [];
  restantes = 0;
  paquete: any = [];
  modal_loading: boolean = false;
  data: any = [];
  status: boolean = false;
  fecha_inicio: string = '';
  set_inicio:string="";
  statusi:string="ACCEPTED";
  tipo:string="profile";

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPaquetes();
    this.getImagenes(this.id,this.statusi,this.tipo);
    this.getProfile(this.id);

  }

  getPaquetes() {
    this.api.getPaquetes().subscribe((resp: any) => {
      if (resp.ok) {
        this.paquetes = resp.data;
      }
    });
  }

  set(event) {
    this.paquete = this.paquetes.find((e) => e._id == event);
  }

  getImagenes(id,status,tipo) {
    this.api.getImagesUser(id,status,tipo).subscribe(async (resp: any) => {
      if (resp.ok) {
        this.imagenes =await  resp.data;  
        this.manageImages();   
      }
    });
  }

  addImagen(event) {
    this.profileImages = [...this.profileImages, event.url];
    this.available_images=this.available_images.filter((e)=>e._id != event._id);
  }

  quitarImagen(item) {
    let existe = this.profileImages.findIndex((e) => e == item);
    this.profileImages.splice(existe, 1);
    this.manageImages();     
  }



  getProfile(id) {
    this.api.getProfile(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
        this.data ? (this.status = true) : (this.status = false);
        this.profileImages = this.data.imagenes.map((x: any) => x);  
        let a = dayjs();       
        let b = this.data.fin || a ;
        this.restantes = Math.abs(a.diff(b, 'day'));
        let c = dayjs(b).format();      
        this.set_inicio=c.split("T")[0];
        ;
      }
    });
  }



  update() {
    this.modal_loading = true;
    let a = {
      id: this.id,
      imagenes: this.profileImages,
      paquete: this.paquete,
      fecha_inicio: this.fecha_inicio,
    };

    this.api.updateProfilePhotos(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.tools.ShowSuccess();
        this.getProfile(this.id);
      }
    })
  }

  manageImages(){
    this.available_images=[];
    if(!!this.profileImages){   
      this.imagenes.forEach(item => {
        let existe = this.profileImages.findIndex(e=>e == item.url );  
        if(existe == -1){
          this.available_images=[...this.available_images,item];     
        } 
      });  
    }else{
      this.available_images=this.imagenes;
    }
  }
}
