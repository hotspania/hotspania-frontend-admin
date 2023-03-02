import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-down-images',
  templateUrl: './down-images.component.html',
  styleUrls: ['./down-images.component.css']
})
export class DownImagesComponent implements OnInit {
  data:any=[];
  specs:any=[];
  fileData:any=[];
  modal_success:boolean=false;
  modal_loading:boolean=false;
  modal_reject:boolean=false;
  id:string="";
  multiselect:boolean=false;
  selected:Array<any>=[];
  tipe:string="";

  constructor(private api:ApiService,private route: ActivatedRoute,private eventos:EventosService) {
    eventos.closingDialog().subscribe((resp:any)=>{
      this.modal_loading=false;
      this.modal_success=false;
      this.modal_reject=false;
      this.selected=[];
      this.multiselect=false;   
      this.tipe=""; 
    })
    eventos.getNewupdate().subscribe((resp:any)=>{
      this.getAllImages(this.id);
      this.modal_loading=false;
      this.modal_success=false;
      this.modal_reject=false;
      this.selected=[];
      this.multiselect=false;
      this.tipe=""; 
    })

   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllImages(this.id);
    this.getSpecs(this.id);
  }

  
  getAllImages(id) {
    this.modal_loading = true;
    this.api.getPendingImagesUser(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;        
        this.modal_loading = false;
      }
    });
  }

  getSpecs(id){
    this.api.getSpecs(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.specs=resp.data;
        console.log(this.specs);
      }
    })
  }

  change(){   
      this.multiselect=!this.multiselect;
      this.selected=[];
  }

  approved(item){
    this.fileData=item;
    this.modal_success=true;
  }

  rejectphoto(item){
    this.fileData=item;
    this.modal_reject=true;
  }

  seleccionar(){
    this.selected= this.data;
  }

  descheck(id){
    this.selected= this.selected.filter((e:any)=>e !== id);
  }

  rejectmultipleimages(){
    this.fileData=this.selected;
    this.tipe="multiselect";
    this.modal_reject=true;
  }
  approvedAll(){
    this.fileData=this.selected;
    this.tipe="multiselect";
    console.log(this.fileData);
    this.modal_success=true;
  }
  approveDownload(){
    this.fileData=this.selected;
    this.tipe="download";
    this.modal_success=true;
  }

  // multiselect


}
