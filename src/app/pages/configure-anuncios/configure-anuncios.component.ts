import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configure-anuncios',
  templateUrl: './configure-anuncios.component.html',
  styleUrls: ['./configure-anuncios.component.css']
})
export class ConfigureAnunciosComponent implements OnInit {
  id:string="";
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  nav(rute){
    this.router.navigate([`/home/${rute}/${this.id}`]);
  }

}
