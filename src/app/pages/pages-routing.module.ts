import { Routes,RouterModule } from "@angular/router";
import { AddMultiPaqueteComponent } from "./add-multi-paquete/add-multi-paquete.component";
import { AdminsUserComponent } from "./admins-user/admins-user.component";
import { AllImagesComponent } from "./all-images/all-images.component";
import { AllComponent } from "./all/all.component";
import { AnuncioGeneralComponent } from "./anuncio-general/anuncio-general.component";
import { AnuncioListadosComponent } from "./anuncio-listados/anuncio-listados.component";
import { ConfigureAnunciosComponent } from "./configure-anuncios/configure-anuncios.component";
import { CrearFichaComponent } from "./crear-ficha/crear-ficha.component";
import { DownImagesComponent } from "./down-images/down-images.component";
import { DownloadImagesComponent } from "./download-images/download-images.component";
import { EditFakeDataComponent } from "./edit-fake-data/edit-fake-data.component";
import { EditRealDataComponent } from "./edit-real-data/edit-real-data.component";
import { FinanceProfileComponent } from "./finance-profile/finance-profile.component";
import { GeneralFinancesComponent } from "./general-finances/general-finances.component";
import { HomeComponent } from "./home/home.component";
import { ImagesDeletedComponent } from "./images-deleted/images-deleted.component";
import { InputProfileComponent } from "./input-profile/input-profile.component";
import { LastInputsComponent } from "./last-inputs/last-inputs.component";
import { LetraslistadoComponent } from "./letraslistado/letraslistado.component";
import { LoginrecordsComponent } from "./loginrecords/loginrecords.component";
import { ManagePhotosComponent } from "./manage-photos/manage-photos.component";
import { MispeticionesComponent } from "./mispeticiones/mispeticiones.component";
import { NoticiasComponent } from "./noticias/noticias.component";
import { PaquetesComponent } from "./paquetes/paquetes.component";
import { PeticionesComponent } from "./peticiones/peticiones.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProximosvencimientosComponent } from "./proximosvencimientos/proximosvencimientos.component";
import { PutFakeDataComponent } from "./put-fake-data/put-fake-data.component";
import { SelectCityComponent } from "./select-city/select-city.component";
import { TagsColletionComponent } from "./tags-colletion/tags-colletion.component";
import { UploadImagesComponent } from "./upload-images/upload-images.component";
import { ZonasComponent } from "./zonas/zonas.component";
import { PendingComponent } from "./pending/pending.component";

const routes: Routes = [
    {
      path: '',
      component:HomeComponent,
      children: [
        {
          path: '',
          component: SelectCityComponent,
        },
        {
          path: ':city/all',
          component: AllComponent,
        },
        {
          path: ':city/pending',
          component: PendingComponent,
        },
        {
          path: ':city/crear',
          component: CrearFichaComponent,
        },
        {
          path: ':city/fakedata/:id',
          component: PutFakeDataComponent,
        },
        {
          path: ':city/images/:id',
          component: UploadImagesComponent,
        },
        {
          path: ':city/zonas',
          component: ZonasComponent,
        },
        {
          path: ':city/tags',
          component: TagsColletionComponent,
        },
        {
          path: ':city/paquetes',
          component: PaquetesComponent,
        },
        {
          path: ':city/download/:id',
          component: DownloadImagesComponent,
        },
        {
          path: ':city/allimages/:id',
          component: ManagePhotosComponent,
        },
        {
          path: ':city/imagesdeleted/:id',
          component: ImagesDeletedComponent,
        },
        {
          path: ':city/aprovedimages/:id',
          component: AllImagesComponent,
        },
        {
          path: ':city/downimages/:id',
          component: DownImagesComponent,
        },
        {
          path: ':city/profile/:id',
          component: ProfileComponent,
        },
        {
          path: ':city/editrealprofile/:id',
          component: EditRealDataComponent,
        },
        {
          path: ':city/editfakeprofile/:id',
          component: EditFakeDataComponent,
        },
        {
          path: ':city/configure/:id',
          component: ConfigureAnunciosComponent,
        },
        {
          path: ':city/anuncio-general/:id',
          component: AnuncioGeneralComponent,
        },
        {
          path: ':city/listas-general/:id',
          component: AnuncioListadosComponent,
        },
        {
          path: ':city/general-finances',
          component: GeneralFinancesComponent,
        },
        {
          path: ':city/finance-profile/:id',
          component: FinanceProfileComponent,
        },
        {
          path: ':city/last-inputs',
          component: LastInputsComponent,
        },
        {
          path: ':city/input-profile/:id',
          component: InputProfileComponent,
        },
        {
          path: ':city/mispeticiones/:id',
          component: MispeticionesComponent,
        },
        {
          path: ':city/peticiones',
          component: PeticionesComponent,
        },
        {
          path: ':city/noticias',
          component: NoticiasComponent,
        },
        {
          path: ':city/add-paquetes',
          component: AddMultiPaqueteComponent,
        },
        {
          path: ':city/admin',
          component: AdminsUserComponent,
        },
        {
          path: ':city/loginrecords',
          component: LoginrecordsComponent,
        },
        {
          path: ':city/nextvencimientos',
          component: ProximosvencimientosComponent,
        },
        {
          path: ':city/listadoletras',
          component: LetraslistadoComponent,
        },
      ],
    },
  ];

export default routes;  