import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CrearletraComponent } from './crearletra/crearletra.component';
import { FooterComponent } from './footer/footer.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { ImageuserloginComponent } from './imageuserlogin/imageuserlogin.component';
import { InputComponent } from './input/input.component';
import { ManagePublicacionesComponent } from './manage-publicaciones/manage-publicaciones.component';
import { ModalCreateListadoComponent } from './modal-create-listado/modal-create-listado.component';
import { ModalEditListadoComponent } from './modal-edit-listado/modal-edit-listado.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { ModalUnoComponent } from './modal-uno/modal-uno.component';
import { ModaldiasComponent } from './modaldias/modaldias.component';
import { ModaltagComponent } from './modaltag/modaltag.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { OutputComponent } from './output/output.component';
import { RejectImageComponent } from './reject-image/reject-image.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagsComponent } from './tags/tags.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../modules/material-components/material-components.module';


@NgModule({
  declarations: [
    ChangepasswordComponent,
    CrearletraComponent,
    FooterComponent,
    ImageContainerComponent,
    ImageuserloginComponent,
    InputComponent,
    ManagePublicacionesComponent,
    ModalCreateListadoComponent,
    ModalEditListadoComponent,
    ModalErrorComponent,
    ModalImageComponent,
    ModalSuccessComponent,
    ModalUnoComponent,
    ModaldiasComponent,
    ModaltagComponent,
    NoticiaComponent,
    OutputComponent,
    RejectImageComponent,
    SidebarComponent,
    TagsComponent,
    TopbarComponent,
  ],
  exports: [
    ChangepasswordComponent,
    CrearletraComponent,
    FooterComponent,
    ImageContainerComponent,
    ImageuserloginComponent,
    InputComponent,
    ManagePublicacionesComponent,
    ModalCreateListadoComponent,
    ModalEditListadoComponent,
    ModalErrorComponent,
    ModalImageComponent,
    ModalSuccessComponent,
    ModalUnoComponent,
    ModaldiasComponent,
    ModaltagComponent,
    NoticiaComponent,
    OutputComponent,
    RejectImageComponent,
    SidebarComponent,
    TagsComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponentsModule
  ],
})
export class ComponentsModule {}
