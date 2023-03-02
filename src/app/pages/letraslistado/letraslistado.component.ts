import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-letraslistado',
  templateUrl: './letraslistado.component.html',
  styleUrls: ['./letraslistado.component.css'],
})
export class LetraslistadoComponent implements OnInit {
  myControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<any[]>;
  selectoption: any = '';
  allData: any=[]; 
  paquetes: any=[];
  loading:boolean=true;
  paquete: any;
  days:any=[];
  createnew:boolean=false;
  asignar:boolean = false;

  letras:any=[];
  position:string="";
  letra:any=[];

  constructor(private api: ApiService,private tool:ToolsService) {}

  ngOnInit(): void {
    this.runinit();
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  runinit(){
    this.getFichas();
    this.getPaquetes();
    this.getLetras();
  }

  getOption(e) {
    this.loading=true;
    let value =this.allData.find(option => option.user.fakeData.username===e);
    this.range(value.dias);   
  }
  closed(){
    this.createnew= !this.createnew;
  }
  set(event) {
    this.paquete = this.paquetes.find((e) => e._id == event);
  }
  range(end) {
    this.days=[...Array(end).keys()];
  }
  getFichas() {
    this.api.getAllProfiles().subscribe((resp: any) => {
      if (resp.ok) {
        let data = resp.data;
        this.allData = data;       
        this.getOptions(data);
      }
    });
  }
  getPaquetes() {
    this.api.getPaquetes().subscribe((resp: any) => {
      if (resp.ok) {
        this.paquetes = resp.data;
      }
    });
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
  getLetras() {
    this.api.getLetras().subscribe((resp: any) => {
      if (resp.ok) {
        this.letras= resp.data;
        console.log(this.letras);
      }
    });
  }
  setletra(item){
    this.asignar=!this.asignar;
    this.letra=item;
  }
  cancelar(){
    this.asignar=false;
    this.letra=[];
  }
  crearletra(){
    this.loading=true
    let a={
      position:this.position
    }
    this.api.crearLetra(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.position=null;
        this.runinit();
        this.loading=false;
        this.createnew=false;
        this.tool.ShowSuccess();
      }
    },error=>{
      console.log(error);
      this.tool.ShowError('ERROR AL CREAR POSICION ')
    })
  }
  asignarletra(){
    this.loading=true
    let a={
      user:'',
      profile:'',
      dias:'',
      id:'',
      fecha_inicio:'',
      active:'',
      taked:''
    }
    this.api.asignarLetra(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.position=null;
        this.runinit();
        this.loading=false;
        this.createnew=false;
        this.tool.ShowSuccess();
      }
    },error=>{
      console.log(error);
      this.tool.ShowError('ERROR AL ASIGNAR POSICION ')
    })
  }






}
