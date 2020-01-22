import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGebruikersComponent } from './manage-gebruikers/manage-gebruikers.component';
import { DetailGebruikerComponent } from './detail-gebruiker/detail-gebruiker.component';
import { CreateGebruikerComponent } from './create-gebruiker/create-gebruiker.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageEvenementenComponent } from './manage-evenementen/manage-evenementen.component';

import { CreateEvenementComponent } from './create-evenement/create-evenement.component';
import { EditEvenementComponent } from './edit-evenement/edit-evenement.component';



@NgModule({
  declarations: [ManageGebruikersComponent, DetailGebruikerComponent, CreateGebruikerComponent, AdminHomeComponent, ManageEvenementenComponent,  CreateEvenementComponent, EditEvenementComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
