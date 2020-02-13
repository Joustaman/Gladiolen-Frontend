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
export class HomeGuardService {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.checkIfLoggedIn() === false) {
      return true;
    } else if (this.authService.getRol() === "1") {
      this.router.navigate(["adminHome"]);
      return false;
    } else if (this.authService.getRol() === "3") {
      this.router.navigate(["/keuzemenu"])
      return false;
    }
    return true;
  }
}
