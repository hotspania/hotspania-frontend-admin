import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface fichaElement {
  nombre:string;
  ficha:string;
  dni:string;
  whatsapp:string;
  cel:string;
  activa:string;
  congelada:string;
  visible:string;
  online:string;
  actions:string;
}


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit , AfterViewInit {
  data: Array<fichaElement> = [];
  name = null;
  dni = null;
  email = null;
  whatsapp = null;
  cel = null;
  status = '';
  modal_loading: boolean = false;
  page: number = 1;
  original_data: any = [];
  number_of_pages: any = [];
  number: number = 10;
  city: string = '';

  item: any = [];
  modal_pass: boolean = false;

  displayedColumns: string[] = [
    'nombre',
    'ficha',
    'dni',
    'whatsapp',
    'cel',
    'activa',
    'congelada',
    'visible',
    'online',
    'actions',
  ];
  dataSource = new MatTableDataSource<fichaElement>(this.data);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private eventos: EventosService
  ) {
    this.eventos.closingDialog().subscribe((x) => {
      this.modal_pass = false;
    });
  }

  ngOnInit(): void {
    this.getAll();   

    this.route.params.subscribe((params) => {
      this.city = params['city'];
    });
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAll() {
    this.modal_loading = true;
    let a = {
      name: this.name,
      dni: this.dni,
      email: this.email,
      whatsapp: this.whatsapp,
      cel: this.cel,
      status: this.status,
    };

    this.api.getFichas(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.modal_loading = false;
        this.original_data = resp.data;
        this.data = this.original_data.map(x => {
          return {
            nombre:x.realData?.nombre,
            ficha:x.fakeData?.username,
            dni:x.realData?.dni,
            whatsapp:x.fakeData?.whatsapp,
            cel:x.realData?.telefono,
            activa:x._id,
            congelada:x._id,
            visible:x._id,
            online:x._id,
            actions:x._id,
          }       
        });

        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changestatus(value) {
    if (value === '3') {
      this.status = null;
    } else {
      this.status = value;
    }
  }

  setpass(x) {
    this.item = x;
    this.modal_pass = true;
  }

  nav(route, id) {
    this.router.navigate([`/home/${this.city}/${route}/${id}`]);
  }

  navimages(rute) {
    this.router.navigate([`/home/${this.city}/allimages/${rute}`]);
  }

  upimages(rute) {
    this.router.navigate([`/home/${this.city}/images/${rute}`]);
  }

  downimages(rute) {
    this.router.navigate([`/home/${this.city}/downimages/${rute}`]);
  }

  goficha(rute) {
    this.router.navigate([`/home/${this.city}/profile/${rute}`]);
  }

  editFicha(rute) {
    this.router.navigate([`/home/${this.city}/editrealprofile/${rute}`]);
  }

  configure(rute) {
    this.router.navigate([`/home/${this.city}/configure/${rute}`]);
  }

  myprofile(rute) {
    this.router.navigate([`/home/${this.city}/finance-profile/${rute}`]);
  }

  addpage(number) {
    this.page = number;
    this.data = this.original_data.slice(
      (this.page - 1) * this.number,
      this.page * this.number
    );
  }
  // nav(){
  //   this.router.navigate([`/home/${this.city}/crear`])
  // }
}
