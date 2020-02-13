import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class VerenigingofadminGuardService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.checkIfLoggedIn() === false) {
      this.router.navigate(["login"]);
      return false;
    } else if (
      this.authService.getRol() === "3" ||
      this.authService.getRol() === "1"
    ) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
