import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-uno.component.html',
  styleUrls: ['./modal-uno.component.css']
})
export class ModalUnoComponent implements OnInit {
  @Input()show: boolean=false;

  constructor() {
   }

  ngOnInit(): void {
  }

}
