import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  RouterOutlet,
  Route,
  Router,
  NavigationStart,
  NavigationError,
  NavigationEnd,
  NavigationCancel
} from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { AdminService } from "./admin/admin.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  openMenu = false;
  gebruiker: any = {};
  rol: any;
  notificationsMenu = "";
  notifications = "";
  loading: boolean;
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {
    this.loading = false;
    router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  menuClick() {
    this.openMenu = !this.openMenu;
    if (this.getRol() === "1") {
      if (this.openMenu) this.notificationsMenu = "";
      else this.notificationsMenu = this.notifications;
      this.updateNotifications();
    }
  }

  checkIfLoggedIn() {
    return this.authService.checkIfLoggedIn();
  }

  logOut() {
    this.authService.logout();
  }

  getRol() {
    if (this.authService.getRol() === null) {
      return "niet ingelogd";
    } else {
      return this.authService.getRol().toString();
    }
  }

  ngOnInit() {
    this.updateNotifications();
  }

  notChangedHandler(count: string) {
    this.notifications = count;
  }

  private updateNotifications() {
    if (this.authService.getRol() === "1") {
      this.adminService.getVerenigingenInAanvraag().subscribe(result => {
        this.notifications = result.length === 0 ? "" : "" + result.length;
        if (!this.openMenu) {
          this.notificationsMenu = this.notifications;
        }
      });
    }
  }
}
