import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Route } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  {
  openMenu = false;
  gebruiker: any = {};
  rol: any;
  constructor(private readonly authService: AuthService) {}

  menuClick() {
    this.openMenu = !this.openMenu;
  }

  checkIfLoggedIn() {
    return this.authService.checkIfLoggedIn();
  }

  logOut() {
    this.authService.logout();
  }

  getRol() {
    if (this.authService.getRol() === null) {
      return 'niet ingelogd';
    } else {
      return this.authService.getRol().toString();
    }
  }
}
