import { Injectable } from '@angular/core';
import { AdminService } from '../admin.service';
import { Observable } from "rxjs";
import { Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TabletResolverService implements Resolve<Observable<any[]>> {

  constructor(private adminService: AdminService) {}
  resolve() {
    return this.adminService.getTabletStatus();
  }
}
