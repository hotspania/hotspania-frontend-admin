import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AllComponent } from './pages/all/all.component';
import { CrearFichaComponent } from './pages/crear-ficha/crear-ficha.component';
import { LoginComponent } from './pages/login/login.component';
import { PutFakeDataComponent } from './pages/put-fake-data/put-fake-data.component';
import { UploadImagesComponent } from './pages/upload-images/upload-images.component';
import { ZonasComponent } from './pages/zonas/zonas.component';
import { PaquetesComponent } from './pages/paquetes/paquetes.component';
import { DownloadImagesComponent } from './pages/download-images/download-images.component';
import { AllImagesComponent } from './pages/all-images/all-images.component';
import { DownImagesComponent } from './pages/down-images/down-images.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditRealDataComponent } from './pages/edit-real-data/edit-real-data.component';
import { EditFakeDataComponent } from './pages/edit-fake-data/edit-fake-data.component';
import { ConfigureAnunciosComponent } from './pages/configure-anuncios/configure-anuncios.component';
import { AnuncioGeneralComponent } from './pages/anuncio-general/anuncio-general.component';
import { AnuncioListadosComponent } from './pages/anuncio-listados/anuncio-listados.component';
import { GeneralFinancesComponent } from './pages/general-finances/general-finances.component';
import { FinanceProfileComponent } from './pages/finance-profile/finance-profile.component';
import { LastInputsComponent } from './pages/last-inputs/last-inputs.component';
import { InputProfileComponent } from './pages/input-profile/input-profile.component';
import { AdminsUserComponent } from './pages/admins-user/admins-user.component';
import { LoginGuard } from './guards/login.guard';
import { ManagePhotosComponent } from './pages/manage-photos/manage-photos.component';
import { AddMultiPaqueteComponent } from './pages/add-multi-paquete/add-multi-paquete.component';
import { SelectCityComponent } from './pages/select-city/select-city.component';
import { TagsColletionComponent } from './pages/tags-colletion/tags-colletion.component';
import { PeticionesComponent } from './pages/peticiones/peticiones.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { MispeticionesComponent } from './pages/mispeticiones/mispeticiones.component';
import { LoginrecordsComponent } from './pages/loginrecords/loginrecords.component';
import { ProximosvencimientosComponent } from './pages/proximosvencimientos/proximosvencimientos.component';
import { ImagesDeletedComponent } from './pages/images-deleted/images-deleted.component';
import { LetraslistadoComponent } from './pages/letraslistado/letraslistado.component';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
