import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UploadService } from '../../services/upload.service';
import { ToolsService } from '../../services/tools.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-real-data',
  templateUrl: './edit-real-data.component.html',
  styleUrls: ['./edit-real-data.component.css']
})
export class EditRealDataComponent implements OnInit {
  archivo: File;
  ImagenTemp: string;
  form:FormGroup;
  modal_loading:boolean=false;
  id:string="";
  user: any;
  dni: any;
  city: string;

  constructor(private api:ApiService,private route:ActivatedRoute,private up:UploadService,private router:Router,private tools:ToolsService) {
    this.form= new FormGroup({     
      id:new FormControl(null,Validators.required),
      nombre:new FormControl(null,Validators.required),
      dni:new FormControl(null,Validators.required),
      telefono:new FormControl(null),
      fecha_nacimiento:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email],this.Existeusuario.bind(this)),
      file:new FormControl(null)
    });

  }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get('id');
    this.city= this.route.snapshot.paramMap.get('city');
    this.getUserData(this.id);
    this.getDniPhoto(this.id);
  }

  Existeusuario(control: AbstractControl) {
    return this.api.checkEmailUser(control.value).pipe( map((resp: any) => {
      return resp.email ? null : { emailTaken: true };
    }));
  }

  seleccionImagen(file: File) {

    if (!file) {
      this.archivo = null;
      return;
    }   
    if (file.type.indexOf('image') < 0) {
      return;
    }
    if (file.size > 10000000) {
      return;
    }
    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () =>this.ImagenTemp = reader.result.toString();   
    this.archivo=file;
  }
  quitarImagen(){
    this.ImagenTemp="";
    this.archivo=null;
    this.form.patchValue({file:null});
  }

  save(){
    this.modal_loading=true;
    this.api.editRealData(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.id=resp.id;
        if(this.ImagenTemp){
          this.up.subirArchivo(this.archivo,'dni',this.id).then((updata:any)=>{
            this.modal_loading=false;
            this.tools.ShowSuccess();
            setTimeout(() => {
              this.router.navigate([`/home/${this.city}/editfakeprofile/${this.id}`]);
            }, 1000);
          }).catch((error)=>{
            console.log(error);
          })
        }else{
          this.modal_loading=false;
          this.tools.ShowSuccess();
          setTimeout(() => {
            this.router.navigate([`/home/${this.city}/editfakeprofile/${this.id}`]);
          }, 1000);
        }
      }else{
        console.log(resp);
      }
    }); 
  }

 
  getUserData(id){
    this.api.getallFicha(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.user=resp.data[0];
        this.form.patchValue({'nombre':this.user.realData?.nombre})
        this.form.patchValue({'dni':this.user.realData?.dni})
        this.form.patchValue({'telefono':this.user.realData?.telefono})
        this.form.patchValue({'fecha_nacimiento':this.user.realData?.fecha_nacimiento})
        this.form.patchValue({'email':this.user.email});
        this.form.patchValue({'id':this.user._id});
      }
    })
  }
  getDniPhoto(id){
    this.api.getdnidata(id).subscribe((resp:any)=>{
      if(resp.ok){      
        this.dni=resp.data[0].url;      
      }
    })
  }


}
