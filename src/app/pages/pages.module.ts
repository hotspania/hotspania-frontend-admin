import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMultiPaqueteComponent } from './add-multi-paquete/add-multi-paquete.component';
import { AdminsUserComponent } from './admins-user/admins-user.component';
import { AllImagesComponent } from './all-images/all-images.component';
import { AllComponent } from './all/all.component';
import { PendingComponent } from './pending/pending.component';
import { AnuncioGeneralComponent } from './anuncio-general/anuncio-general.component';
import { AnuncioListadosComponent } from './anuncio-listados/anuncio-listados.component';
import { ConfigureAnunciosComponent } from './configure-anuncios/configure-anuncios.component';
import { CrearFichaComponent } from './crear-ficha/crear-ficha.component';
import { DownImagesComponent } from './down-images/down-images.component';
import { DownloadImagesComponent } from './download-images/download-images.component';
import { EditFakeDataComponent } from './edit-fake-data/edit-fake-data.component';
import { EditRealDataComponent } from './edit-real-data/edit-real-data.component';
import { FinanceProfileComponent } from './finance-profile/finance-profile.component';
import { GeneralFinancesComponent } from './general-finances/general-finances.component';
import { HomeComponent } from './home/home.component';
import { ImagesDeletedComponent } from './images-deleted/images-deleted.component';
import { InputProfileComponent } from './input-profile/input-profile.component';
import { LastInputsComponent } from './last-inputs/last-inputs.component';
import { LetraslistadoComponent } from './letraslistado/letraslistado.component';
import { LoginComponent } from './login/login.component';
import { LoginrecordsComponent } from './loginrecords/loginrecords.component';
import { ManagePhotosComponent } from './manage-photos/manage-photos.component';
import { MispeticionesComponent } from './mispeticiones/mispeticiones.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { PeticionesComponent } from './peticiones/peticiones.component';
import { ProfileComponent } from './profile/profile.component';
import { ProximosvencimientosComponent } from './proximosvencimientos/proximosvencimientos.component';
import { PutFakeDataComponent } from './put-fake-data/put-fake-data.component';
import { SelectCityComponent } from './select-city/select-city.component';
import { TagsColletionComponent } from './tags-colletion/tags-colletion.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { ZonasComponent } from './zonas/zonas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../modules/material-components/material-components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { RouterModule} from '@angular/router';
import routes from './pages-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    CrearFichaComponent,
    AllComponent,
    PendingComponent,
    ProfileComponent,
    PutFakeDataComponent,
    UploadImagesComponent,
    ZonasComponent,
    PaquetesComponent,
    DownloadImagesComponent,
    AllImagesComponent,
    DownImagesComponent,
    EditRealDataComponent,
    EditFakeDataComponent,
    ConfigureAnunciosComponent,
    AnuncioGeneralComponent,
    AnuncioListadosComponent,
    GeneralFinancesComponent,
    FinanceProfileComponent,
    LastInputsComponent,
    InputProfileComponent,
    AdminsUserComponent,
    ManagePhotosComponent,
    AddMultiPaqueteComponent,
    SelectCityComponent,
    TagsColletionComponent,
    NoticiasComponent,
    PeticionesComponent,
    MispeticionesComponent,
    LoginrecordsComponent,
    ProximosvencimientosComponent,
    ImagesDeletedComponent,
    LetraslistadoComponent,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    CrearFichaComponent,
    AllComponent,
    PendingComponent,
    ProfileComponent,
    PutFakeDataComponent,
    UploadImagesComponent,
    ZonasComponent,
    PaquetesComponent,
    DownloadImagesComponent,
    AllImagesComponent,
    DownImagesComponent,
    EditRealDataComponent,
    EditFakeDataComponent,
    ConfigureAnunciosComponent,
    AnuncioGeneralComponent,
    AnuncioListadosComponent,
    GeneralFinancesComponent,
    FinanceProfileComponent,
    LastInputsComponent,
    InputProfileComponent,
    AdminsUserComponent,
    ManagePhotosComponent,
    AddMultiPaqueteComponent,
    SelectCityComponent,
    TagsColletionComponent,
    NoticiasComponent,
    PeticionesComponent,
    MispeticionesComponent,
    LoginrecordsComponent,
    ProximosvencimientosComponent,
    ImagesDeletedComponent,
    LetraslistadoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule.forChild(routes),
    FormsModule,
    ComponentsModule,
    MaterialComponentsModule,
  ],
})
export class PagesModule {}
