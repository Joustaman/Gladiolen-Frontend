import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';



@NgModule({
  declarations: [ManageUsersComponent, UserDetailComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
