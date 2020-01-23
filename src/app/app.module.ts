import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {CreateVerenigingComponent} from './vereniging/create-vereniging/create-vereniging.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MymaterialModule } from './mymaterial/mymaterial.module';
import { LoginComponent } from './login/login.component';
import { LedenComponent } from './vereniging/leden/leden.component';
import { CreateLidComponent } from './vereniging/create-lid/create-lid.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { KeuzemenuComponent } from './vereniging/keuzemenu/keuzemenu.component';
import { EditVerenigingComponent } from './vereniging/edit-vereniging/edit-vereniging.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    CreateVerenigingComponent,
    LoginComponent,
    LedenComponent,
    CreateLidComponent,
    SpinnerComponent,
    KeuzemenuComponent,
    EditVerenigingComponent
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
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
