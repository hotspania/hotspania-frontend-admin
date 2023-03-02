import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-loginrecords',
  templateUrl: './loginrecords.component.html',
  styleUrls: ['./loginrecords.component.css']
})
export class LoginrecordsComponent implements OnInit {
  page:number=1;
  data:any=[];
  number_of_pages: any = [];
  number:number=10;

  constructor(private api:ApiService,private tool:ToolsService,private ls:LocalStorageService) { }

  ngOnInit(): void {
    this.getRecords(this.page);
  }

  getRecords(id){
    let a= id*10;
    let b=(id-1)*10; 

    this.api.getAllLoginRecords(a,b).subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;
     
      }
    })

  }

  addpage(number) {
    this.page=number;    
    this.getRecords(this.page);
  }



}
