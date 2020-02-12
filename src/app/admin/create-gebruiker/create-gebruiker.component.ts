import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {Router, Route, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-gebruiker',
  templateUrl: './create-gebruiker.component.html',
  styleUrls: ['./create-gebruiker.component.scss']
})
export class CreateGebruikerComponent implements OnInit {

  tshirts: any = [];
  rollen: any = [];
  verenigingen: any = [];
  gebruiker: any = {};
  maat: any;
  geslacht: any;
  pageLoaded = false;

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
    foto: new FormControl(null),
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router,
              private readonly toast: ToastrService) {
  }

  ngOnInit() {
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

  submitForm() {
    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        console.log(error);
        this.toast.error('Vul het formulier correct in');
      }
    );
  }
  createGebruiker() {
    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        console.log(error);
        this.toast.error('Vul het formulier correct in');
      }
    );
  }

  createTshirt(gebruikerId) {
    let tshirt = {maat: this.maat, geslacht: this.geslacht, gebruiker_id: gebruikerId, tshirttype_id: null};

    this.adminService.createTshirt(tshirt).subscribe(
      () => {
        this.toast.success('Lid aangemaakt');
        this.router.navigate(['/manageGebruikers']);
      }
    );
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
}
