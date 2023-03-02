import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as dayjs from 'dayjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FinanzasService } from 'src/app/services/finanzas.service';

@Component({
  selector: 'app-modal-edit-listado',
  templateUrl: './modal-edit-listado.component.html',
  styleUrls: ['./modal-edit-listado.component.css']
})
export class ModalEditListadoComponent implements OnInit {
  paquetes: any = [];
  restantes = 0;
  paquete: any = [];
  @Input() id: string = '';
  modal_loading: boolean = false;
  data: any = [];
  status: boolean = false;
  fecha_inicio: string = '';
  set_inicio:string="";
  admin: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tools: ToolsService,
    public eventos:EventosService,
    private fs:FinanzasService,
    private ls:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.modal_loading=true;
    let x =this.route.snapshot.paramMap.get('id');
    if(!!x){
      this.id = this.route.snapshot.paramMap.get('id');
    }
    this.getPaquetes();
    this.getProfile(this.id);
    this.getAdmin();
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

  getProfile(id) {
    this.api.getProfile(id).subscribe((resp: any) => {  
      if (resp.ok) {        
        this.data = resp.data;
        this.data ? (this.status = true) : (this.status = false);       
        let a = dayjs();       
        let b =dayjs(this.data.fin) || a ;
        this.restantes = b.diff(a, 'day');       
        let c = dayjs(b).format();      
        this.set_inicio=c.split("T")[0];
        this.modal_loading=false;        
      }
    });
  }

  async getAdmin() {
    this.admin = await this.ls.cargarStorage('usuario').then((x) => x);
  }

  update() {
    this.modal_loading = true;
    let a = {
      id: this.id,      
      paquete: this.paquete,
      fecha_inicio: this.fecha_inicio,
    };
    this.api.updateProfile(a).subscribe((resp:any)=>{
      if(resp.ok){
        let b = {
          amount: this.paquete.price,
          paquete: this.paquete,
          user: this.id,
          admin: this.admin,         
          profile: this.data._id,
        };  
        this.fs.setOutput(b).subscribe((resp: any) => {
          if (resp.ok) {      
            this.tools.ShowSuccess();
            this.modal_loading = false;
            this.eventos.newUpdateAlert();
            this.getProfile(this.id);

          }
        });     
      
      }
    })
  }




}
