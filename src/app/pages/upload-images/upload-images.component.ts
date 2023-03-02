import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';


@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  @ViewChild('imagesuploader') imagesuploader;
  images:any=[];
  archivos:any=[];
  error_modal:boolean=false;
  modal_loading:boolean=false;
  error:string="";
  id:string="";
  specs:any=[];
  upload:boolean=false;
  imagetype:string="";


  constructor(private up:UploadService,private route:ActivatedRoute,private api:ApiService,private tool:ToolsService,private router:Router) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
  }
  uploadImages(files:FileList) {   
    
    if (!files) {
      this.archivos = null;
      return;
    }

    for (let i = 0; i < files.length; i++) {

      let file = files.item(i);
      if (file.type.indexOf('image') < 0) {

        return;
      }
      if (file.size > 10000000) {

        return;
      }
      let reader = new FileReader();
      let UrlImageTemp = reader.readAsDataURL(file);
      reader.onloadend = () => this.images.push({
        nombre: file.name,
        imagen: reader.result.toString()
      });


      if (this.archivos.length > 20) {

        return
      }

      this.archivos=[...this.archivos,file];
    }
  }
  quitarImagen(item) {
    let existe = this.images.findIndex(e => e.nombre == item.nombre);
    this.archivos.splice(existe, 1);
    this.images.splice(existe, 1);
  }

  save(){
    if(this.archivos.length==0){
      this.tool.ShowError("Debe Seleccionar almenos una imagen");
      return;
    }
    if(!this.imagetype){
      this.tool.ShowError("Debe Seleccionar el tipo de imagen");
      return;
    }

    this.modal_loading=true;
    let a ={
      specs:this.specs,
      id:this.id
    }
    this.api.putSpecs(a).subscribe((resp:any)=>{
      if(resp.ok){      
        if(this.archivos.length==1){
          this.up.subirArchivo(this.archivos[0],this.imagetype,this.id).then((data:any)=>{
            setTimeout(() => {
              this.modal_loading=false;
              this.tool.ShowSuccess(); 
              this.upload=true;
              this.images=[];
              this.archivos=[];
              this.imagesuploader.nativeElement.value=null;
              this.imagetype='';
              this.specs=[];
            }, 1000);
          });
        }else{
          this.up.subirArchivos(this.archivos,this.imagetype,this.id).then((data:any)=>{
            setTimeout(() => {
              this.modal_loading=false;
              this.tool.ShowSuccess(); 
              this.upload=true;
              this.images=[];
              this.archivos=[];
              this.imagesuploader.nativeElement.value=null;
              this.imagetype='';
              this.specs=[];
            }, 1000);
          });
        }
      }
    });    
  }


  continue(){
    this.router.navigate(['/home'])
  }


  settype(e){
    this.imagetype= e.target.value; 
  }





  pushlocations(e) {
    if (this.specs.includes(e.target.value)) {
      this.specs = this.specs.filter(a => a !== e.target.value);
    } else {
      this.specs = [...this.specs, e.target.value];
    }
  }




}
