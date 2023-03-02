import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EventosService } from '../../services/eventos.service';
import { FinanzasService } from 'src/app/services/finanzas.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface irecord {
  monto: string;
  descripcion: string;
  fecha: string;
  admin: string;
  actions: string;
}
export interface orecord {
  paquete: string;
  clase: string;
  monto: string;
  descripcion: string;
  fecha: string;
  admin: string;
  actions: string;
}


@Component({
  selector: 'app-finance-profile',
  templateUrl: './finance-profile.component.html',
  styleUrls: ['./finance-profile.component.css'],
})
export class FinanceProfileComponent implements OnInit {
  id: string = '';
  finanzas: any = [];
  profile: any = [];
  value: number = 0;
  ajuste: number = 0;
  admin: any = [];
  outputs: Array<orecord> = [];
  displayedoutputColumns: string[] = [
    'paquete',
    'clase',
    'monto',
    'descripcion',
    'fecha',
    'admin',
    'actions'
  ];
  inputs: Array<irecord> = [];
  displayedColumns: string[] = [
    'monto',
    'descripcion',
    'fecha',
    'admin',
    'actions'
  ];

  dataSource2 = new MatTableDataSource<irecord>(this.outputs);
  dataSource = new MatTableDataSource<irecord>(this.inputs);

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('sort2') sort2: MatSort;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('sort') sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

  modal_loading: boolean = false;
  modal_imagelistado: boolean = false;
  modal_createlistado: boolean = false;
  modal_editlistado: boolean = false;

  input_number: number = 1;
  output_number: number = 1;
  pages_input: any = [];
  pages_output: any = [];

  $profile: boolean = false;

  modal_confirmation: boolean = false;
  item_delete: any = [];
  tipo: string = '';

  modal_dias: boolean = false;
  dias: number = null;


  constructor(
    private api: ApiService,
    private fs: FinanzasService,
    private tools: ToolsService,
    private router: Router,
    private route: ActivatedRoute,
    private ls: LocalStorageService,
    public eventos: EventosService
  ) {
    eventos.closingDialog().subscribe((x) => {
      this.modal_imagelistado = false;
      this.modal_createlistado = false;
      this.modal_editlistado = false;
      this.modal_confirmation = false;
      this.modal_dias = false;
      this.getPublicaciones(this.id);
      this.getFinanzas(this.id);
    });
    eventos.getNewupdate().subscribe((x) => {
      this.getPublicaciones(this.id);
      this.getFinanzas(this.id);
      this.getCompras(this.id);
      this.getIngresos(this.id);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPublicaciones(this.id);
    this.getFinanzas(this.id);
    this.getAdmin();
    this.getCompras(this.id);
    this.getIngresos(this.id);
  }

  getPublicaciones(id) {
    this.api.getProfile(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          this.profile = resp.data;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }

  getFinanzas(id) {
    this.api.getFinanzasProfile(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.finanzas = resp.data[0];
        this.$profile = true;
      }
    });
  }

  async getAdmin() {
    this.admin = await this.ls.cargarStorage('usuario').then((x) => x);
  }

  addpage(number) {
    this.input_number = number;
    this.inputs = this.inputs.slice(
      (this.input_number - 1) * 10,
      this.input_number * 10
    );
  }

  addpage2(number) {
    this.output_number = number;
    this.outputs = this.outputs.slice(
      (this.output_number - 1) * 10,
      this.output_number * 10
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  send() {
    this.modal_loading = true;
    if (this.value === 0) {
      this.modal_loading = false;
      this.tools.ShowError('Almenos debe ingresar un valor distinto de cero');
      return;
    }
    let a = {
      amount: this.value,
      id: this.id,
      admin: this.admin._id,
    };
    this.fs.setInput(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.value = 0;
        this.tools.ShowSuccess();
        this.modal_loading = false;
        this.getFinanzas(this.id);
      }
    });
  }
  openimagenlistado() {
    this.modal_imagelistado = !this.modal_imagelistado;
  }

  opencrearlistado() {
    this.modal_createlistado = !this.modal_createlistado;
  }

  openeditarlistado() {
    this.modal_editlistado = !this.modal_editlistado;
  }

  activarFicha() {
    this.modal_loading = true;
    let a = {
      id: this.id,
    };
    this.api.activarProfile(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.value = 0;
        this.tools.ShowSuccess();
        this.modal_loading = false;
        this.getFinanzas(this.id);
        this.getPublicaciones(this.id);
      }
    });
  }

  getCompras(id) {
    this.fs.getComprasUser(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          let item = resp.data;
          this.outputs = item.map(x => {
            return {
              paquete: x.paquete[0]?.titulo,
              clase: x.paquete[0]?.clase,
              monto: x.amount,
              descripcion: x.description,
              fecha: x.date,
              actions: x._id,
              admin: x.admin
            }
          })
          this.dataSource2 = new MatTableDataSource(this.outputs);
          this.dataSource2.sort = this.sort2;
          this.dataSource2.paginator = this.paginator2;
          this.$profile = true;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }

  getIngresos(id) {
    this.fs.getIngresosUser(id).subscribe(
      (resp: any) => {
        if (resp.ok) {
          let item = resp.data;
          this.inputs = item.map(x => {
            return {
              monto: x.amount,
              descripcion: x.description,
              fecha: x.date,
              admin: x.admin,
              actions: x._id
            }
          })
          this.dataSource = new MatTableDataSource(this.inputs);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.$profile = true;
        }
      },
      (error: any) => {
        this.$profile = false;
      }
    );
  }

  setStates(item) {
    this.modal_loading = true;
    let a = {
      id: this.profile._id,
      active: this.profile.active,
      freeze: this.profile.freeze,
      visible: this.profile.visible,
      online: this.profile.online
    };

    switch (item.x) {
      case 'active':
        a.active = item.value;
        break;
      case 'freeze':
        a.freeze = item.value;
        break;
      case 'visible':
        a.visible = item.value;
        break;
      case 'online':
        a.online = item.value;
        break;
      default:
        break;
    }

    this.fs.setStates(a).subscribe((resp: any) => {
      if (resp.ok) {
        console.log(resp);
        this.getPublicaciones(this.id);
        this.modal_loading = false;
        this.tools.ShowSuccess();
      }
    })

  }

  borrar(item, tipo) {
    this.item_delete = item;
    this.tipo = tipo;
    this.modal_confirmation = true;
  }

  setajuste() {
    this.modal_dias = true;
  }

  deleterecord() {
    this.modal_loading = true;
    let a = {
      item: this.item_delete,
      id: this.id,
      admin: this.admin._id,
      tipo: this.tipo
    };
    this.fs.deleteRecord(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.item_delete = [];
        this.tipo = "";
        this.getPublicaciones(this.id);
        this.getFinanzas(this.id);
        this.getCompras(this.id);
        this.getIngresos(this.id);
        this.modal_loading = false;
        this.modal_confirmation = false;
        this.tools.ShowSuccess();
      }
    });
  }

  ajustardias() {
    this.modal_loading = true;
    let a = {
      days: this.dias,
      id: this.profile._id,
    };
    this.fs.ajustardias(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.dias = 0;
        this.getPublicaciones(this.id);
        this.getFinanzas(this.id);
        this.getCompras(this.id);
        this.getIngresos(this.id);
        this.modal_loading = false;
        this.modal_confirmation = false;
        this.tools.ShowSuccess();
      }
    });
  }













}
