import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { FinanzasService } from 'src/app/services/finanzas.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  modal_loading: boolean = false;
  value: number = 0;
  description: string = '';
  @Input() profile: string = "";
  @Input() user: string=""; 
  @Input() admin: string = '';

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private eventos: EventosService,
    private fs:FinanzasService
  ) {}

  ngOnInit(): void {
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
      user: this.user,
      admin: this.admin,
      description: this.description,
      profile: this.profile,
    };  

    this.fs.setOutput(a).subscribe((resp: any) => {
      if (resp.ok) {
        this.value = 0;
        this.description = '';
        this.tools.ShowSuccess();
        this.modal_loading = false;
        this.eventos.newUpdateAlert();
      }
    });
  }

}
