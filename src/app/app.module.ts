import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AdminModule} from './admin/admin.module';
import { CreateVerenigingComponent } from './vereniging/create-vereniging/create-vereniging.component';
import { CreateVerantwoordelijkeComponent } from './vereniging/create-verantwoordelijke/create-verantwoordelijke.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateVerenigingComponent,
    CreateVerantwoordelijkeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
