import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-tablet-status-bekijken",
  templateUrl: "./tablet-status-bekijken.component.html",
  styleUrls: ["./tablet-status-bekijken.component.scss"]
})
export class TabletStatusBekijkenComponent implements OnInit {
  tablets: any[];
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tablets = this.route.snapshot.data["tablets"];
    const now = new Date();
    const tijd2minGeleden = new Date(now.valueOf() - 2 * 60000);
    const tijdhalfuurGeleden = new Date(now.valueOf() - 30 * 60000);

    this.tablets.forEach(tablet => {
      if (tablet.batterijpercentage < 30) {
        tablet.batterijKleur = "red";
      } else if (tablet.batterijpercentage < 70) {
        tablet.batterijKleur = "orange";
      } else {
        tablet.batterijKleur = "green";
      }

      let datum = new Date(tablet.laatstGeupdatet);
      if (tijd2minGeleden.valueOf() < datum.valueOf()) {
        tablet.tijdKleur = "green";
      } else if (tijdhalfuurGeleden.valueOf() < datum.valueOf()) {
        tablet.tijdKleur = "orange";
      } else {
        tablet.tijdKleur = "red";
      }
    });
  }
}
