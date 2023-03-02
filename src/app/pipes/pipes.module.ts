import { NgModule } from '@angular/core';
import { ImagenPipe } from './images.pipe';
import { SafePipe } from './safe.pipe';
import { DownloadPipe } from './download.pipe';
import { FichaPipe } from './ficha.pipe';
import { StatusPipe } from './status.pipe';




@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafePipe,
    DownloadPipe,
    FichaPipe,
    StatusPipe
  ],
  exports: [
    ImagenPipe,
    SafePipe,
    FichaPipe,
    StatusPipe
  ]
})
export class PipesModule { }