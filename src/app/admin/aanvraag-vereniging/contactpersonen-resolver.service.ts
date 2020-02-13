import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../admin.service";

@Injectable({
  providedIn: "root"
})
export class ContactpersonenResolverService
  implements Resolve<any[]>{
  constructor(private adminService: AdminService) {}
  async resolve() {
    let admins = await this.adminService.getAdmins().toPromise();    
    let kernleden = await this.adminService.getKernleden().toPromise();
    return admins.concat(kernleden);
  }
}
