import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import * as dayjs from 'dayjs';
import { EventosService } from '../../services/eventos.service';


@Component({
  selector: 'app-modal-create-listado',
  templateUrl: './modal-create-listado.component.html',
  styleUrls: ['./modal-create-listado.component.css']
})
export class ModalCreateListadoComponent implements OnInit {
  paquetes: any = [];
  restantes = 0;
  paquete: any = [];
  id: string = '';
  modal_loading: boolean = false;
  data: any = [];
  status: boolean = false;
  fecha_inicio: string = '';
  set_inicio:string="";

    constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tools: ToolsService,
    public eventos:EventosService
  ) {}

  ngOnInit(): void {
    this.modal_loading=true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPaquetes();
  }
  
  getPaquetes() {
    this.api.getPaquetes().subscribe((resp: any) => {
      if (resp.ok) {
        this.paquetes = resp.data;
        this.modal_loading=false;
      }
    });
  }

  set(event) {
    this.paquete = this.paquetes.find((e) => e._id == event);
  }

  save() {
    this.modal_loading = true;
    if(this.paquete.length==0){
      this.modal_loading=false;
      return this.tools.ShowError("Debe Seleccionar un Paquete");
    }
    let a = {
      id: this.id,   
      paquete: this.paquete,
      fecha_inicio: dayjs(this.fecha_inicio),
    };
    
    this.api.createProfile(a).subscribe((resp:any)=>{
      if(resp.ok){
        this.modal_loading=false;
        this.tools.ShowSuccess();       
      }
    })
  }




}
