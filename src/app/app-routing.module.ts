import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateVerenigingComponent} from './vereniging/create-vereniging/create-vereniging.component';
import {ManageGebruikersComponent} from './admin/manage-gebruikers/manage-gebruikers.component';
import {DetailGebruikerComponent} from './admin/detail-gebruiker/detail-gebruiker.component';
import {CreateGebruikerComponent} from './admin/create-gebruiker/create-gebruiker.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {ManageEvenementenComponent} from './admin/manage-evenementen/manage-evenementen.component';
import {LedenComponent} from './vereniging/leden/leden.component';
import {CreateLidComponent} from './vereniging/create-lid/create-lid.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {KeuzemenuComponent} from './vereniging/keuzemenu/keuzemenu.component';
import {ManageVerenigingenComponent} from './admin/manage-verenigingen/manage-verenigingen.component';
import {EditVerenigingComponent} from './vereniging/edit-vereniging/edit-vereniging.component';
import {CreateVerenigingAdminComponent} from './admin/create-vereniging-admin/create-vereniging-admin.component';
import {LoginComponent} from './login/login.component';
import {EditVerenigingAdminComponent} from './admin/edit-vereniging-admin/edit-vereniging-admin.component';
import {EditGebruikerComponent} from './admin/edit-gebruiker/edit-gebruiker.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {path: 'manageGebruikers', component: ManageGebruikersComponent, canActivate: [AuthGuardService]},
  {path: 'createGebruiker', component: CreateGebruikerComponent, canActivate: [AuthGuardService]},
  {path: 'adminHome', component: AdminHomeComponent, canActivate: [AuthGuardService]},
  {path: 'manageEvenementen', component: ManageEvenementenComponent, canActivate: [AuthGuardService]},
  {path: 'createEvenement', component: CreateVerenigingComponent, canActivate: [AuthGuardService]},
  {path: 'detailGebruiker', component: DetailGebruikerComponent, canActivate: [AuthGuardService]},
  {path: 'editGebruiker/:id', component: EditGebruikerComponent, canActivate: [AuthGuardService]},
  {path: 'manageVerenigingen', component: ManageVerenigingenComponent, canActivate: [AuthGuardService]},
  {path: 'createVerenigingAdmin', component: CreateVerenigingAdminComponent, canActivate: [AuthGuardService]},
  {path: 'editVerenigingAdmin/:id', component: EditVerenigingAdminComponent, canActivate: [AuthGuardService]},
  {path: 'createvereniging', component: CreateVerenigingComponent},
  {path: 'leden', component: LedenComponent, canActivate: [AuthGuardService]},
  {path: 'maaklid', component: CreateLidComponent, canActivate: [AuthGuardService]},
  {path: 'editlid/:id', component: CreateLidComponent, canActivate: [AuthGuardService]},
  {path: 'spinner', component: SpinnerComponent},
  {path: 'keuzemenu', component: KeuzemenuComponent, canActivate: [AuthGuardService]},
  {path: 'vereniging/editvereniging', component: EditVerenigingComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
