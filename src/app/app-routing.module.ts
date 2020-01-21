import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateVerenigingComponent} from './vereniging/create-vereniging/create-vereniging.component';
import {ManageGebruikersComponent} from './admin/manage-gebruikers/manage-gebruikers.component';
import {DetailGebruikerComponent} from './admin/detail-gebruiker/detail-gebruiker.component';
import {CreateGebruikerComponent} from './admin/create-gebruiker/create-gebruiker.component';

const routes: Routes = [
  {path: 'manageGebruikers', component: ManageGebruikersComponent},
  {path: 'createGebruiker', component: CreateGebruikerComponent},
  {path: 'detailGebruiker', component: DetailGebruikerComponent},
  {path: 'createvereniging', component: CreateVerenigingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
