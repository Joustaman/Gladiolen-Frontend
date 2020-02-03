import { Component, OnInit } from "@angular/core";
import { AdminService } from "../admin.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-aanvraag-vereniging",
  templateUrl: "./aanvraag-vereniging.component.html",
  styleUrls: ["./aanvraag-vereniging.component.scss"]
})
export class AanvraagVerenigingComponent implements OnInit {
  verenigingen: any[];
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private readonly toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.verenigingen = this.route.snapshot.data["verenigingen"];
  }

  accept(id) {
    this.toastr.success("Vereniging goedgekeurd!","",{timeOut:2000});
    this.adminService.acceptVereningInAanvraag(id).subscribe(r => {
      this.updateVerenigingen();
    });
  }
  deny(id) {
    this.toastr.info("Vereniging geweigerd","",{timeOut:2000});
    this.adminService.denyVereningInAanvraag(id).subscribe(r => {
      this.updateVerenigingen();
    });
  }

  private updateVerenigingen() {
    this.adminService.getVerenigingenInAanvraag().subscribe(res => {
      this.verenigingen = res;
      if(res.length===0){
        this.router.navigateByUrl("/adminHome")
      }
    });
  }
}
