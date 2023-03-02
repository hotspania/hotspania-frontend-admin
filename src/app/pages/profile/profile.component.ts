import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from '../../services/tools.service';

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
  modal_loading:boolean = false
  modal_pass:boolean = false

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
  }

  ngOnInit(): void {
    this.modal_loading=true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.city = this.route.snapshot.paramMap.get('city');  
    this.getUserData(this.id);
    this.getDniPhoto(this.id);
    this.getTags(this.id);
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

  deletetags(id){
    this.modal_loading=true;
    let a ={
      id:id
    }
    this.api.deletetag(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.getTags(this.id);
        this.modal_loading=false;
        this.tools.ShowSuccess();
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
}
