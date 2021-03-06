import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGebruikersComponent } from './manage-gebruikers/manage-gebruikers.component';
import { DetailGebruikerComponent } from './detail-gebruiker/detail-gebruiker.component';
import { CreateGebruikerComponent } from './create-gebruiker/create-gebruiker.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageEvenementenComponent } from './manage-evenementen/manage-evenementen.component';
import { ManageVerenigingenComponent } from './manage-verenigingen/manage-verenigingen.component';
import { MymaterialModule } from '../mymaterial/mymaterial.module';
import { CreateVerenigingAdminComponent } from './create-vereniging-admin/create-vereniging-admin.component';
import { EditVerenigingAdminComponent } from './edit-vereniging-admin/edit-vereniging-admin.component';
import { EditGebruikerComponent } from './edit-gebruiker/edit-gebruiker.component';
import { ManageTijdsregistratiesComponent } from './manage-tijdsregistraties/manage-tijdsregistraties.component';
import { AanvraagVerenigingComponent } from './aanvraag-vereniging/aanvraag-vereniging.component';
import { ManageTakenComponent } from './manage-taken/manage-taken.component';
import { TabletStatusBekijkenComponent } from './tablet-status-bekijken/tablet-status-bekijken.component';
import { HotTableModule } from '@handsontable/angular';
import { ManageVerenigingLedenAdminComponent } from './manage-vereniging-leden-admin/manage-vereniging-leden-admin.component';
import { GebruikerFilterPipe } from './manage-gebruikers/gebruiker-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { VerenigingFilterPipe } from './manage-verenigingen/vereniging-filter.pipe';
import { CreateVrijwilligerComponent } from './create-vrijwilliger/create-vrijwilliger.component';
import { TijdsregistratieFilterPipe } from './manage-tijdsregistraties/tijdsregistratie-filter.pipe';
import { EvenementenFilterPipe } from './manage-evenementen/evenementen-filter.pipe';
import { CreateLidVerenigingComponent } from './create-lid-vereniging/create-lid-vereniging.component';
import { SpinnerModule } from '../spinner/spinner.module';
import { MatDialogRef } from '@angular/material';
@NgModule({
  declarations: [
    ManageGebruikersComponent,
    DetailGebruikerComponent,
    CreateGebruikerComponent,
    AdminHomeComponent,
    ManageEvenementenComponent,
    ManageVerenigingenComponent,
    CreateVerenigingAdminComponent,
    EditVerenigingAdminComponent,
    EditGebruikerComponent,
    ManageTijdsregistratiesComponent,
    AanvraagVerenigingComponent,
    ManageTakenComponent,
    TabletStatusBekijkenComponent,
    GebruikerFilterPipe,
    ManageVerenigingLedenAdminComponent,
    VerenigingFilterPipe,
    CreateVrijwilligerComponent,
    TijdsregistratieFilterPipe,
    EvenementenFilterPipe,
    CreateLidVerenigingComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MymaterialModule,
    FormsModule,
    HotTableModule.forRoot(),
    NgxPaginationModule,
    SpinnerModule,
  ], 

  providers:[{
    provide: MatDialogRef,
    useValue: {}
  }]
})
export class AdminModule {}
