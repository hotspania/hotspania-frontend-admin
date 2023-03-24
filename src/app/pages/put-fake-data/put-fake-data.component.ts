import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-put-fake-data',
  templateUrl: './put-fake-data.component.html',
  styleUrls: ['./put-fake-data.component.css'],
})
export class PutFakeDataComponent implements OnInit {
  modal_loading: boolean = false;
  form: FormGroup;
  zonas: any = [];
  atencion: Array<any> = ["Domicilio","Depto. Propio","Hoteles"];
  id:string="";
  city: string;
  constructor(private api: ApiService,private route:ActivatedRoute,private router:Router) {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      edad: new FormControl(null),
      whatsapp: new FormControl(null),
      telefono: new FormControl(null),
      atencion: new FormControl(this.atencion),
      tags: new FormControl(null),
      fumadora: new FormControl('Si', Validators.required),
      zonas: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      servicios: new FormControl('Normales', Validators.required),
      estatura: new FormControl(null),
      peso: new FormControl(null),
      busto: new FormControl(null),
      cintura: new FormControl(null),
      cadera: new FormControl(null),
      inicio: new FormControl(null, Validators.required),
      fin: new FormControl(null, Validators.required),
      horario_inicio: new FormControl(null, Validators.required),
      horario_fin: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getZonas();
    this.id = this.route.snapshot.paramMap.get('id');
    this.city= this.route.snapshot.paramMap.get('city');
    this.form.patchValue({id:this.id});
  }

  getZonas() {
    this.api.getZones().subscribe((resp: any) => {
      if (resp.ok) {
        this.zonas = resp.data;
      }
    });
  }

  pushlocations(e) {
    if (this.atencion.includes(e.target.value)) {
      this.atencion = this.atencion.filter(a => a !== e.target.value);
    } else {
      this.atencion = [...this.atencion, e.target.value];
    }
    this.form.patchValue({atencion:this.atencion});   
  }

  save(){   
    this.modal_loading=true;
    this.api.putFakeData(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        setTimeout(() => {
          this.modal_loading=false;
          this.router.navigate([`/home/${this.city}/images/${this.id}`]);
        }, 2000);
      }
    });
  }
  
}
