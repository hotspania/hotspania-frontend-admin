import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-add-multi-paquete',
  templateUrl: './add-multi-paquete.component.html',
  styleUrls: ['./add-multi-paquete.component.css'],
})
export class AddMultiPaqueteComponent implements OnInit {
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  selectoption:any="";
  fichas:any=[];
  allData:any=[];
  restData:any=[];
  loading:boolean=true;
  paquetes: any=[];
  paquete: any;
  modal_loading:boolean=false;

  constructor(private api:ApiService) {

  }
  
  private _filter(value: string): any[] {   
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.getFichas();
    this.getPaquetes();
  }

  getOption(e){
    this.loading=true;
    let value =this.allData.filter(option => option.user.fakeData.username===e);
    this.fichas=[...this.fichas,value[0]];
    this.restData = this.restData.filter(option => option.user.fakeData.username !== e);   
    this.myControl.reset(null);
    this.myControl.markAsUntouched({});
    this.selectoption="";
    this.getOptions(this.restData);  
  }

  getFichas(){
  this.api.getAllProfiles().subscribe((resp:any)=>{
    if(resp.ok){
      let data = resp.data;    
      this.allData=data;
      this.restData=data; 
      this.getOptions(data);
    }
  })
  }

  getPaquetes() {
    this.api.getPaquetes().subscribe((resp: any) => {
      if (resp.ok) {
        this.paquetes = resp.data;
      }
    });
  }
  set(event) {
    this.paquete = this.paquetes.find((e) => e._id == event);
  }

  getOptions(data){
    this.options = data.map(value => value.user.fakeData.username);
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.loading=false;
  }

  deleteOption(item){
    this.restData=[...this.restData,item];
    this.fichas=this.fichas.filter(e=>e !==item);
    this.getOptions(this.restData);  
  }

  cancel(){
    this.fichas=[];
    this.restData=this.allData;
    this.getOptions(this.restData);
  }

  send(){
    this.modal_loading=true;
    let a={
      paquete:this.paquete,
      usuarios:this.fichas
    }

    this.api.sendmultiplepaquetes(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.fichas=[];
        this.paquete=[];
        this.restData=this.allData;
        this.getOptions(this.restData);
      }
    })
  }
}
