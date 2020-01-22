import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import { CreateVerenigingComponent } from './vereniging/create-vereniging/create-vereniging.component';
import { CreateVerantwoordelijkeComponent } from './vereniging/create-verantwoordelijke/create-verantwoordelijke.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MymaterialModule } from './mymaterial/mymaterial.module';

@NgModule({
  declarations: [
    AppComponent,
    CreateVerenigingComponent,
    CreateVerantwoordelijkeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MymaterialModule,
    AdminModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
