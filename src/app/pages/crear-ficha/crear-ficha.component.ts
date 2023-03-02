import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UploadService } from '../../services/upload.service';
import { ToolsService } from '../../services/tools.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrls: ['./crear-ficha.component.css'],
})
export class CrearFichaComponent implements OnInit {
  archivo: File;
  ImagenTemp: string;
  form:FormGroup;
  modal_loading:boolean=false;
  id:string="";
  city: string;

  constructor(private api:ApiService,private up:UploadService,private router:Router,private tools:ToolsService,private route:ActivatedRoute) {
    this.form= new FormGroup({
      nombre:new FormControl(null,Validators.required),
      dni:new FormControl(null,Validators.required),
      telefono:new FormControl(null),
      fecha_nacimiento:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email],this.Existeusuario.bind(this)),
      file:new FormControl(null)
    });

  }

  ngOnInit(): void {
    this.city= this.route.snapshot.paramMap.get('city');
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
    this.api.createFicha(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.id=resp.id;
        if(this.archivo){
          this.up.subirArchivo(this.archivo,'dni',this.id).then((updata:any)=>{
            this.modal_loading=false;
            this.tools.ShowSuccess();
            setTimeout(() => {
              this.router.navigate([`/home/${this.city}/fakedata/${this.id}`]);
            }, 500);
          }).catch((error)=>{
           this.tools.ShowError("Error")
          })
        }else{
          this.modal_loading=false;
          this.tools.ShowSuccess();
          setTimeout(() => {
            this.router.navigate([`/home/${this.city}/fakedata/${this.id}`]);
          }, 500);
        }
      }else{
        this.tools.ShowError("Error")
      }
    }); 
  }

  nav(){
    this.router.navigate([`/home/${this.city}/all`]);
  }

  Existeusuario(control: AbstractControl) {
    return this.api.checkEmailUser(control.value).pipe( map((resp: any) => {
      return resp.email ? null : { emailTaken: true };
    }));
  }

}
