import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-gebruiker',
  templateUrl: './edit-gebruiker.component.html',
  styleUrls: ['./edit-gebruiker.component.scss']
})
export class EditGebruikerComponent implements OnInit {

  gebruiker: any = {};
  tshirts: any = [];
  rollen: any = [];
  verenigingen: any = [];
  pageLoaded = false;

  gebruikerForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    tweedetshirt: new FormControl(false),
    opmerking: new FormControl(''),
    rijksregisternr: new FormControl(''),
    wachtwoord: new FormControl(''),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    qrcode: new FormControl(null),
    foto: new FormControl(null),
    tshirt_id: new FormControl(null),
    rol_id: new FormControl(null),
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router, private readonly route: ActivatedRoute, private toastr: ToastrService) {
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
      geboortedatum: this.gebruiker.geboortedatum,
      email: this.gebruiker.email,
      telefoon: this.gebruiker.telefoon,
      tweedetshirt: this.gebruiker.tweedetshirt,
      opmerking: this.gebruiker.opmerking,
      rijksregisternr: this.gebruiker.rijksregisternr,
      wachtwoord: this.gebruiker.wachtwoord,
      eersteAanmelding: this.gebruiker.eersteAanmelding,
      lunchpakket: this.gebruiker.lunchpakket,
      qrcode: this.gebruiker.qrcode,
      foto: this.gebruiker.foto,
      tshirt_id: this.gebruiker.tshirt_id,
      rol_id: this.gebruiker.rol_id
    });
  }

  changeTshirt() {
    let value = this.gebruikerForm.get('tweedetshirt').value;
    this.gebruikerForm.patchValue({
      tweedetshirt: !value
    });
  }

  changeLunch() {
    let value = this.gebruikerForm.get('lunchpakket').value;
    this.gebruikerForm.patchValue({
      lunchpakket: !value
    });
  }

  changeRol() {
    let value = this.gebruikerForm.get('rol_id').value;
  }

  updateGebruiker() {
    this.adminService.updateGebruiker(this.gebruiker.id, this.gebruikerForm.value).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Gebruiker geupdate');
        this.router.navigate(['manageGebruikers']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
