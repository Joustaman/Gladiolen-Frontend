import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../admin.service";

@Injectable({
  providedIn: "root"
})
export class AanvragenResolverService implements Resolve<Observable<any[]>> {
  constructor(private adminService: AdminService) {}
  resolve() {
    return this.adminService.getVerenigingenInAanvraag();
  }
}
