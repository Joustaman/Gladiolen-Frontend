import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {CreateVerenigingComponent} from './vereniging/create-vereniging/create-vereniging.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MymaterialModule} from './mymaterial/mymaterial.module';
import {LoginComponent} from './login/login.component';
import {LedenComponent} from './vereniging/leden/leden.component';
import {CreateLidComponent} from './vereniging/create-lid/create-lid.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {KeuzemenuComponent} from './vereniging/keuzemenu/keuzemenu.component';
import {EditVerenigingComponent} from './vereniging/edit-vereniging/edit-vereniging.component';
import {ToastrModule} from 'ngx-toastr';
import {DetailVerenigingComponent} from './vereniging/detail-vereniging/detail-vereniging.component';
import { TokenInterceptor } from './auth/token.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    CreateVerenigingComponent,
    LoginComponent,
    LedenComponent,
    CreateLidComponent,
    SpinnerComponent,
    KeuzemenuComponent,
    EditVerenigingComponent,
    DetailVerenigingComponent
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
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
