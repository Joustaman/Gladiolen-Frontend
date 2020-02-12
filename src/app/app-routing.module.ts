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
import {AuthGuardService} from './auth/auth-guard.service';
import {ManageTijdsregistratiesComponent} from './admin/manage-tijdsregistraties/manage-tijdsregistraties.component';
import {AanvraagVerenigingComponent} from './admin/aanvraag-vereniging/aanvraag-vereniging.component';
import {AanvragenResolverService} from './admin/aanvraag-vereniging/aanvragen-resolver.service';
import {ManageTakenComponent} from './admin/manage-taken/manage-taken.component';
import {TabletStatusBekijkenComponent} from './admin/tablet-status-bekijken/tablet-status-bekijken.component';
import {TabletResolverService} from './admin/tablet-status-bekijken/tablet-resolver.service';
import {AdminGuardService} from './auth/admin-guard.service';
import {VerantwoordelijkeGuardService} from './auth/verantwoordelijke-guard.service';
import {HomeGuardService} from './auth/home-guard.service';
import {AppComponent} from './app.component';
import {ManageVerenigingLedenAdminComponent} from './admin/manage-vereniging-leden-admin/manage-vereniging-leden-admin.component';
import {ProfielComponent} from './profiel/profiel.component';
import {BevestigingAanvraagComponent} from './vereniging/bevestiging-aanvraag/bevestiging-aanvraag.component';

const routes: Routes = [
  {
    path: 'manageGebruikers',
    component: ManageGebruikersComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'createGebruiker',
    component: CreateGebruikerComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'adminHome',
    component: AdminHomeComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'manageEvenementen',
    component: ManageEvenementenComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'createEvenement',
    component: CreateVerenigingComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'detailGebruiker/:id',
    component: DetailGebruikerComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'editGebruiker/:id',
    component: EditGebruikerComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'manageVerenigingen',
    component: ManageVerenigingenComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'createVerenigingAdmin',
    component: CreateVerenigingAdminComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'editVerenigingAdmin/:id',
    component: EditVerenigingAdminComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: "manageVerenigingLedenAdmin/:id",
    component: LedenComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'manageTijdsregistraties',
    component: ManageTijdsregistratiesComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'manageTaken',
    component: ManageTakenComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'createvereniging',
    component: CreateVerenigingComponent
  },
  {
    path: 'leden',
    component: LedenComponent,
    canActivate: [VerantwoordelijkeGuardService]
  },
  {
    path: 'maaklid',
    component: CreateLidComponent,
    canActivate: [VerantwoordelijkeGuardService]
  },
  {
    path: 'adminmaaklid',
    component: CreateLidComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'editlid/:id',
    component: CreateLidComponent,
    canActivate: [VerantwoordelijkeGuardService]
  },
  {
    path: 'spinner',
    component: SpinnerComponent
  },
  {
    path: 'keuzemenu',
    component: KeuzemenuComponent,
    canActivate: [VerantwoordelijkeGuardService]
  },
  {
    path: 'vereniging/editvereniging',
    component: EditVerenigingComponent,
    canActivate: [VerantwoordelijkeGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'aanvragenVerenigingen',
    component: AanvraagVerenigingComponent,
    canActivate: [AdminGuardService],
    resolve: {verenigingen: AanvragenResolverService}
  },
  {
    path: 'tabletStatus',
    component: TabletStatusBekijkenComponent,
    canActivate: [AdminGuardService],
    resolve: {tablets: TabletResolverService}
  },
  {
    path: 'profiel',
    component: ProfielComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'bevestigingAanvraag',
    component: BevestigingAanvraagComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
