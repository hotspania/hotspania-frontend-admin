import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.css'],
})
export class PeticionesComponent implements OnInit {
  peticiones: any = [];
  item: any = [];
  status: string = '';
  respuesta: string = '';
  admin: any = [];
  modal_loading:boolean=false;

  page: number = 1;
  pending_data: any = [];
  number_of_pages: any = [];
  number: number = 10;

  constructor(private api: ApiService, private ls: LocalStorageService,private tool:ToolsService) {}

  ngOnInit(): void {
    this.getAdmin();
  }

  getPeticionesActive(a) {
    this.api.getAllPeticiones(a).subscribe((response) => {
      if (response.ok) {
        this.pending_data = response.data;
        this.peticiones = this.pending_data.slice(0, this.page * this.number);
        this.number_of_pages = Array(
          Math.round(this.pending_data.length / this.number) + 1
        )
          .fill(null)
          .map((_, i) => i + 1);
      }
    });
  }

  set(data) {
    this.item = data;
    this.respuesta=this.item.respuesta
    this.status = data.status;
  }

  async getAdmin() {
    this.admin = await this.ls.cargarStorage('usuario').then((x) => x);

  }

  addpage(number) {
    this.page=number;    
    this.peticiones = this.pending_data.slice((this.page-1)*this.number,(this.page*this.number));
  }

  send() {
    this.modal_loading=true;
    let a = {
      status: this.status,
      respuesta: this.respuesta,
      _id: this.item._id,
      admin:this.admin._id
    };
    this.api.sendresponsepeticiones(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.item=[];
        this.respuesta="";
        this.modal_loading=false;
        this.tool.ShowSuccess();
      }
    });
  }
}
