import { Pipe, PipeTransform } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { UrlService } from '../services/url.service';
import { ApiService } from '../services/api.service';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  public url: String;
  
  constructor(private http: HttpClient,private api:ApiService) {}

  async transform(id: string, tipo: string): Promise<any> {
    if (!!id) { 
      switch (tipo) {
        case 'active':
          return new Promise((resolve,reject)=>{
            this.api.getProfile(id).subscribe(resp =>{              
            if(resp.data.active){
              resolve('Si')
            }else{
              resolve('No')
            }
            });
          })  

        case 'freeze':
          return new Promise((resolve,reject)=>{
            this.api.getProfile(id).subscribe(resp =>{
            if(resp.data.freeze){
              resolve('Si')
            }else{
              resolve('No')
            }
            });
          })  
        case 'visible':
          return new Promise((resolve,reject)=>{
            this.api.getProfile(id).subscribe(resp =>{
            if(resp.data.visible){
              resolve('Si')
            }else{
              resolve('No')
            }

            });
          }) 
      
        case 'online':
          return new Promise((resolve,reject)=>{
            this.api.getProfile(id).subscribe(resp =>{
            if(resp.data.online){
              resolve('Si')
            }else{
              resolve('No')
            }
            });
          })        
        default:
          break;
      } 
    } else {
      return 'DEFAULT';
    }
  }
}
