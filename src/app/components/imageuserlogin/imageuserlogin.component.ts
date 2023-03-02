import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-imageuserlogin',
  templateUrl: './imageuserlogin.component.html',
  styleUrls: ['./imageuserlogin.component.css']
})
export class ImageuserloginComponent implements OnInit {
  @Input() id:string;
  image:string="";

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getProfile(this.id);
  }

  getProfile(id){
    this.api.getLoginImageUser(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.image=resp.data.url;
      }
    })
  }
  

}
