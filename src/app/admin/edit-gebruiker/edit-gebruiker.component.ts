import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-gebruiker',
  templateUrl: './edit-gebruiker.component.html',
  styleUrls: ['./edit-gebruiker.component.scss'],
  providers: [DatePipe]
})
export class EditGebruikerComponent implements OnInit {

  gebruiker: any = {};
  tshirts: any = [];
  rollen: any = [];
  verenigingen: any = [];
  pageLoaded = false;
  maat: any;
  geslacht: any;
  gebruikerForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol_id: new FormControl(null),
    rijksregisternr: new FormControl(''),
    password: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null)
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router,
              private readonly route: ActivatedRoute, private readonly datepipe: DatePipe,
              private readonly toast: ToastrService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (params.get('id') !== null) {
          this.adminService.getGebruiker(params.get('id')).subscribe(
            result => {
              this.gebruiker = result;
              this.fillForm();
              this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      });

    this.adminService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );

    this.adminService.getRollen().subscribe(
      result => {
        this.rollen = result;
      },
    );

    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
      },
    );
  }

  fillForm() {
    this.gebruikerForm.patchValue({
      name: this.gebruiker.name,
      voornaam: this.gebruiker.voornaam,
      roepnaam: this.gebruiker.roepnaam,
      geboortedatum: this.datepipe.transform(this.gebruiker.geboortedatum, 'yyyy-MM-dd'),
      email: this.gebruiker.email,
      telefoon: this.gebruiker.telefoon,
      opmerking: this.gebruiker.opmerking,
      rijksregisternr: this.gebruiker.rijksregisternr,
      eersteAanmelding: this.gebruiker.eersteAanmelding,
      lunchpakket: this.gebruiker.lunchpakket,
      qrcode: this.gebruiker.qrcode,
      foto: this.gebruiker.foto,
      rol_id: this.gebruiker.rol_id
    });
    this.maat = this.gebruiker.tshirts[0].maat;
    this.geslacht = this.gebruiker.tshirts[0].geslacht;
  }

  updateGebruiker() {
    this.adminService.updateGebruiker(this.gebruiker.id, this.gebruikerForm.value).subscribe(
      result => {
        this.updateTshirt();
      },
      error => {
        console.log(error);
      }
    );
  }

  updateTshirt() {
    let tshirt = {maat: this.maat, geslacht: this.geslacht, gebruiker_id: this.gebruiker.id, tshirttype_id: null};
    this.adminService.updateTshirt(this.gebruiker.id, tshirt).subscribe(
      result => {
        this.toast.success('Gebruiker geupdate');
        this.router.navigate(['/manageGebruikers']);
      }
    );
  }

  changeRol() {
    let value = this.gebruikerForm.get('rol_id').value;
  }
}
