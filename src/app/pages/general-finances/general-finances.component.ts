import { Component, OnInit } from '@angular/core';
import { FinanzasService } from 'src/app/services/finanzas.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-general-finances',
  templateUrl: './general-finances.component.html',
  styleUrls: ['./general-finances.component.css']
})
export class GeneralFinancesComponent implements OnInit {
  balance:number=0;
  inputs:number=0;
  pendings:number=0;
  pending_users: any;
  last_inputs:any=[];

  constructor(private api:ApiService,private fs:FinanzasService) { }

  ngOnInit(): void {
    this.getStatusFinanzas();
    this.getPendingUsers();
    this.getLastInputs();
  }


  getStatusFinanzas(){
    this.fs.getStatusFinanzas().subscribe((resp:any)=>{
      if(resp.ok){
        this.balance=resp.data.balance;
        this.inputs=resp.data.inputs;
        this.pendings=resp.data.pending;
      }
    })
  }
  
  getPendingUsers(){
    this.fs.getPendingUsers().subscribe((resp:any)=>{
      if(resp.ok){
        this.pending_users=resp.data; 
      }
    })
  }

  getLastInputs(){
    this.fs.getLastInputs().subscribe((resp:any)=>{    
      if(resp.ok){
        this.last_inputs=resp.data;      
      }
    })
  }

}
