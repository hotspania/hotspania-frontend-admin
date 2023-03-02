import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-proximosvencimientos',
  templateUrl: './proximosvencimientos.component.html',
  styleUrls: ['./proximosvencimientos.component.css']
})
export class ProximosvencimientosComponent implements OnInit {
  data: any=[];
  id:string="";
  modal_dias:boolean = false;

  constructor(private api:ApiService,private eventos:EventosService) {
    this.eventos.closingDialog().subscribe(x=>{
      this.modal_dias=false;
    })

    this.eventos.getNewupdate().subscribe(x=>{
      this.getAll();
      this.modal_dias=false;
    })
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getAllVencimientos().subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;        
      }
    });
  }
  

  set(id){
    this.id = id
    this.modal_dias=true;
  }

}
