import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ViewerGuardService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.checkIfLoggedIn() === false) {
      this.router.navigate(["login"]);
      return false;
    } else if (this.authService.getRol() !== "5") {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
