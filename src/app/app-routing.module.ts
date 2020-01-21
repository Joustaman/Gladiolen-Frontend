import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageUsersComponent} from './admin/manage-users/manage-users.component';

const routes: Routes = [{path: 'manageUser', component: ManageUsersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
