import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from '../../services/tools.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: string = '';
  user: any = [];
  dni: string = '';
  modal_tag: boolean = false;
  city: string;
  tags: any=[];
  gProfile: any;
  modal_loading:boolean = false
  modal_pass:boolean = false

  public profile: FormGroup;
  public deleteProfile: FormGroup;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private eventos:EventosService,
    private tools:ToolsService
  ) {
    eventos.closingDialog().subscribe(x =>{
      this.modal_tag=false;
      this.getTags(this.id);
      this.modal_pass=false;
    })

    this.profile = new FormGroup({
      _id: new FormControl(null, Validators.required),
      activa: new FormControl(null, Validators.required),
    });

    this.deleteProfile = new FormGroup({
      _id: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.modal_loading=true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.city = this.route.snapshot.paramMap.get('city');  
    this.getUserData(this.id);
    this.getDniPhoto(this.id);
    this.getTags(this.id);
    this.getProfile(this.id);
  }

  getUserData(id) {
    this.api.getallFicha(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.user = resp.data[0];
        this.modal_loading=false;
      }
    });
  }
  getDniPhoto(id) {
    this.api.getdnidata(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.dni = resp.data[0].url;
      }
    });
  }

  getTags(id){
    this.api.getTags(id).subscribe((resp:any)=>{
      if(resp.ok){       
        this.tags=resp.data;
      }
    })
  }

  getProfile(id){
    this.api.getProfile(id).subscribe((resp:any)=>{
      if(resp.ok){       
        this.gProfile=resp.data;
      }
    })
  }

  deletetags(id){
    this.modal_loading=true;
    let a ={
      id:id
    }
    this.api.deletetag(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.getTags(this.id);
        this.modal_loading=false;
        this.tools.ShowSuccess("Tags borrados");
      }
    })
  }

  goficha(link) {
    this.router.navigate([`/home/${this.city}/${link}/${this.id}`]);
  }

  tag() {
    this.modal_tag = true;
  }

  setpass(){
    this.modal_pass=true;
  }

  
  public updateFicha(activa:number){
    this.modal_loading=true;
    this.profile.setValue({_id: this.id, activa});
    
    this.api.updateFichaStatus(this.profile.value).subscribe((res:any)=>{
      if(res.code === 201){
        this.tools.ShowSuccess("Se ha activado la ficha");
        setTimeout(() => {
          location.reload();
         }, 2000);
      } else {
        this.tools.ShowError("Error al activar la ficha");
      }
    });
    this.modal_loading=false;
  }

  public deleteFicha(){
    this.modal_loading=true;
    const profileId = this.gProfile._id;
    const userId = this.user._id;

    this.api.deleteProfile(profileId).subscribe((resp:any)=>{
    })

    this.api.deleteUser(userId).subscribe((resp:any)=>{
    })

    this.modal_loading=false;
    this.tools.ShowSuccess("Usuario y ficha borrado.");

    setTimeout(() => {
      this.router.navigate(['/home']);       
     }, 500);

  }

}
