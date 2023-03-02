import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { FinanzasService } from 'src/app/services/finanzas.service';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToolsService } from '../../services/tools.service';


@Component({
  selector: 'app-last-inputs',
  templateUrl: './last-inputs.component.html',
  styleUrls: ['./last-inputs.component.css'],
})
export class LastInputsComponent implements OnInit {
  data: any = [];
  pending_users: any = [];
  name: string = '';
  item: any = [];
  admin: any = [];
  modal_loading: boolean = false;

  constructor(
    private api: ApiService,
    private ls: LocalStorageService,
    private tools: ToolsService,
    private eventos:EventosService,
    private fs:FinanzasService
  ) {
   eventos.getNewupdate().subscribe(x=>{
      this.getPendingUsers();
    })
  }

  ngOnInit(): void {
    this.getPendingUsers();
    this.getAdmin();
  }

  getPendingUsers() {
    this.fs.getPendingUsers().subscribe((resp: any) => {
      if (resp.ok) {
        this.data = resp.data;
        this.pending_users = resp.data;
      }
    });
  }

  async getAdmin() {
    this.admin = await this.ls.cargarStorage('usuario').then((x) => x);
  }

  search(value) {
    let query = value.toLowerCase();
    this.pending_users = this.data.filter(
      (item) => item.user.fakeData?.username.toLowerCase().indexOf(query) >= 0
    );
  }

  set(item) {
    this.item = item;
  }
}
