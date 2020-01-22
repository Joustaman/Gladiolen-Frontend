import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateVerenigingComponent} from './vereniging/create-vereniging/create-vereniging.component';
import {ManageGebruikersComponent} from './admin/manage-gebruikers/manage-gebruikers.component';
import {DetailGebruikerComponent} from './admin/detail-gebruiker/detail-gebruiker.component';
import {CreateGebruikerComponent} from './admin/create-gebruiker/create-gebruiker.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import { CreateVerantwoordelijkeComponent } from './vereniging/create-verantwoordelijke/create-verantwoordelijke.component';
import {ManageEvenementenComponent} from './admin/manage-evenementen/manage-evenementen.component';
import {CreateEvenementComponent} from './admin/create-evenement/create-evenement.component';
import {EditEvenementComponent} from './admin/edit-evenement/edit-evenement.component';
import { LedenComponent } from './vereniging/leden/leden.component';
import { CreateLidComponent } from './vereniging/create-lid/create-lid.component';

const routes: Routes = [
  {path: 'manageGebruikers', component: ManageGebruikersComponent},
  {path: 'createGebruiker', component: CreateGebruikerComponent},
  {path: 'adminHome', component: AdminHomeComponent},
  {path: 'manageEvenementen', component: ManageEvenementenComponent},
  {path: 'detailGebruiker', component: DetailGebruikerComponent},
  {path: 'createvereniging', component: CreateVerenigingComponent},
  {path: 'createverantwoordelijke', component: CreateVerantwoordelijkeComponent},
  {path: 'leden', component: LedenComponent},
  {path: 'maaklid', component: CreateLidComponent},
  {path: 'editlid/:id', component: CreateLidComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
