import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input()id : string="";
  tags:any=[];

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAll(this.id);

  }

  getAll(id){
    this.api.getTags(id).subscribe((resp:any)=>{
      if(resp.ok){       
        this.tags=resp.data;
      }
    })
  }

}
