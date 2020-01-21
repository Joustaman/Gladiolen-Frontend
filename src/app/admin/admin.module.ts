import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGebruikersComponent } from './manage-gebruikers/manage-gebruikers.component';
import { DetailGebruikerComponent } from './detail-gebruiker/detail-gebruiker.component';
import { CreateGebruikerComponent } from './create-gebruiker/create-gebruiker.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [ManageGebruikersComponent, DetailGebruikerComponent, CreateGebruikerComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AdminModule { }
