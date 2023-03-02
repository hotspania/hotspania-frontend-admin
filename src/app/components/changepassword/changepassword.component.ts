import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  @Input()id :string;
  @Input()name :string;
  modal_loading:boolean=false;
  form: FormGroup;
  constructor(private api:ApiService,private tool:ToolsService,public eventos:EventosService) {
    this.form=new FormGroup({
      _id:new FormControl(null,Validators.required),
      pass:new FormControl(null,Validators.required)  
    })
   }

  ngOnInit(): void {
    this.form.patchValue({_id:this.id})
  }

  crear(){
    this.modal_loading=true;
    this.api.changePasswordUser(this.form.value).subscribe((resp:any)=>{
      if(resp.ok){
        this.tool.ShowSuccess();
        this.modal_loading=false;
        this.form.reset();
        this.eventos.Closing();
      }
    })
  }

}
