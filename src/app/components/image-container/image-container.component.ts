import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css']
})
export class ImageContainerComponent implements OnInit {
  @Input() img:string="";
  @Input() tipe:string="";
  url:string;

  constructor() {
   }

  ngOnInit(): void {
   this.url=`${Global.url}img/${this.tipe}/${this.img}`;   
  }





}
