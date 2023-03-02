import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnInit {
  city:string="choose";

  constructor(private router:Router,private ls:LocalStorageService,private eventos:EventosService) { }

  ngOnInit(): void {
  }

  nav(){
    this.ls.SaveStorage('city',this.city);
    this.eventos.setUrl();
    this.router.navigate([`/home/${this.city}/all`]);
  }

}
