import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {VerenigingService} from '../../vereniging/vereniging.service';

@Component({
  selector: 'app-create-gebruiker',
  templateUrl: './create-gebruiker.component.html',
  styleUrls: ['./create-gebruiker.component.scss']
})
export class CreateGebruikerComponent implements OnInit {
  gebruikerForm = new FormGroup({
    naam: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    straat: new FormControl(''),
    huisnummer: new FormControl(''),
    geboortedatum: new FormControl(''),
    emailadres: new FormControl(''),
    telefoon: new FormControl(''),
    tweedetshirt: new FormControl(false),
    opmerking: new FormControl(''),
    rijksregisternr: new FormControl(''),
    postcode: new FormControl(''),
    wachtwoord: new FormControl(''),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    qrcode: new FormControl(null),
    foto: new FormControl(null),
    tshirt_id: new FormControl(null),
    rol_id: new FormControl(null),
  });
  tshirts: any = [];
  constructor(private readonly verenigingService: VerenigingService) { }
  ngOnInit() {
    this.verenigingService.getTshirts().subscribe(
        result => {
          this.tshirts = result;
        },
    );
  }
  submitForm() {
    this.verenigingService.registreerVerantwoordelijke(this.gebruikerForm.value).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
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
    this.gebruikerForm.patchValue({
      rol_id: !value
    });
  }
}
