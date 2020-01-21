import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManageUsersComponent} from './admin/manage-users/manage-users.component';
import { CreateVerenigingComponent } from './vereniging/create-vereniging/create-vereniging.component';

const routes: Routes = [
  {path: 'manageUser', component: ManageUsersComponent},
  {path: 'createvereniging', component: CreateVerenigingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
