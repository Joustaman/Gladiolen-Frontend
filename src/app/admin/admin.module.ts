import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageGebruikersComponent } from './manage-gebruikers/manage-gebruikers.component';
import { DetailGebruikerComponent } from './detail-gebruiker/detail-gebruiker.component';



@NgModule({
  declarations: [ManageGebruikersComponent, DetailGebruikerComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
