import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AdminService } from "../admin.service";
import { Router, Route, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-gebruiker",
  templateUrl: "./create-gebruiker.component.html",
  styleUrls: ["./create-gebruiker.component.scss"]
})
export class CreateGebruikerComponent implements OnInit {
  tshirts: any = [];
  rollen: any = [];
  verenigingen: any = [];
  gebruiker: any = {};
  maat: any;
  geslacht: any;
  pageLoaded = false;
  btnVisible = true;

  gebruikerForm = new FormGroup({
    name: new FormControl(""),
    voornaam: new FormControl(""),
    roepnaam: new FormControl(""),
    geboortedatum: new FormControl(""),
    email: new FormControl(""),
    telefoon: new FormControl(""),
    opmerking: new FormControl(""),
    rol_id: new FormControl(null),
    rijksregisternr: new FormControl(""),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null)
  });

  constructor(
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly toast: ToastrService
  ) {}

  ngOnInit() {
    this.adminService.getTshirts().subscribe(result => {
      this.tshirts = result;
    });

    this.adminService.getRollen().subscribe(result => {
      this.rollen = result;
    });

    this.adminService.getVerenigingen().subscribe(result => {
      this.verenigingen = result;
    });
  }

  submitForm() {
    this.btnVisible = false;
    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        this.btnVisible = true;
        this.toast.error("Vul het formulier correct in");
      }
    );
  }

  createGebruiker() {
    this.btnVisible = false;

    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        this.btnVisible = true;

        console.log(error);
        this.toast.error("Vul het formulier correct in");
      }
    );
  }

  createTshirt(gebruikerId) {
    let tshirt = {
      maat: this.maat,
      geslacht: this.geslacht,
      gebruiker_id: gebruikerId,
      tshirttype_id: null
    };

    this.adminService.createTshirt(tshirt).subscribe(
      result => {
        this.toast.success("Lid aangemaakt");
        this.router.navigate(["/manageGebruikers"]);
      },
      error => {
        this.btnVisible = true;
      }
    );
  }

  changeTshirt() {
    let value = this.gebruikerForm.get("tweedetshirt").value;
    this.gebruikerForm.patchValue({
      tweedetshirt: !value
    });
  }

  changeRol() {
    let value = this.gebruikerForm.get("rol_id").value;
  }
}
