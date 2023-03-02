import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-edit-fake-data',
  templateUrl: './edit-fake-data.component.html',
  styleUrls: ['./edit-fake-data.component.css']
})
export class EditFakeDataComponent implements OnInit {
  modal_loading: boolean = false;
  form: FormGroup;
  zonas: any = [];
  atencion: Array<any> = [];
  id:string="";
  data:any=[];
  city: string;
  constructor(private api: ApiService,private route:ActivatedRoute,private router:Router,private tool:ToolsService) {
    this.form = new FormGroup({
      id: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      edad: new FormControl(null, Validators.required),
      whatsapp: new FormControl(null),
      telefono: new FormControl(null),
      atencion: new FormControl(null, Validators.required),
      tags: new FormControl(null),      
      fumadora: new FormControl(null, Validators.required),
      zonas: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      servicios: new FormControl(null, Validators.required),
      estatura: new FormControl(null, Validators.required),
      peso: new FormControl(null, Validators.required),
      busto: new FormControl(null, Validators.required),
      cintura: new FormControl(null, Validators.required),
      cadera: new FormControl(null, Validators.required),
      inicio: new FormControl(null, Validators.required),
      fin: new FormControl(null, Validators.required),
      horario_inicio: new FormControl(null, Validators.required),
      horario_fin: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getZonas();
    this.id= this.route.snapshot.paramMap.get('id');
    this.city= this.route.snapshot.paramMap.get('city');
    this.getFakeData(this.id);
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
          this.modal_loading=false;
          this.tool.ShowSuccess();     
      }
    });
  }

  getFakeData(id){
    this.api.getFicha(id).subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data[0].fakeData;       
        this.form.patchValue(this.data);
      }
    })
  }

  nav(){
    this.router.navigate([`/home/${this.city}/all`])
  }

}
