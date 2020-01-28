import { Component } from '@angular/core';
import { RouterOutlet, Route } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  constructor(private readonly authService: AuthService) {}
  openMenu = false;
  menuClick() {
    this.openMenu = !this.openMenu;
  }

  checkIfLoggedIn() {
    return this.authService.checkIfLoggedIn();
  }

  logOut() {
    this.authService.logout();
  }
}
