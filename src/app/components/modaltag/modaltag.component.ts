import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { ApiService } from '../../services/api.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-modaltag',
  templateUrl: './modaltag.component.html',
  styleUrls: ['./modaltag.component.css'],
})
export class ModaltagComponent implements OnInit {
  tag: string = '';
  modal_loading: boolean = false;
  @Input() id: string = '';
  data: any=[];

  constructor(
    public eventos: EventosService,
    private api: ApiService,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.getTags();
  }

  crear() {
    this.modal_loading = true;

    let a = {
      user: this.id,
      titulo: this.tag,
    };

    this.api.createtag(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.modal_loading = false;
        this.tag = '';
        this.eventos.Closing();
        this.tools.ShowSuccess();
      }
    });
  }

  getTags(){
    this.api.getColletion().subscribe((resp:any)=>{
      if(resp.ok){
        this.data=resp.data;
      }
    })
  }



}
