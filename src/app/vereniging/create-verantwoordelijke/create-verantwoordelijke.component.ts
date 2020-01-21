import { Component, OnInit } from '@angular/core';
import { VerenigingService } from '../vereniging.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-verantwoordelijke',
  templateUrl: './create-verantwoordelijke.component.html',
  styleUrls: ['./create-verantwoordelijke.component.scss']
})
export class CreateVerantwoordelijkeComponent implements OnInit {

  verantwoordelijkeForm = new FormGroup({
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
    this.verenigingService.registreerVerantwoordelijke(this.verantwoordelijkeForm.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeTshirt() {
    let value = this.verantwoordelijkeForm.get('tweedetshirt').value;
    this.verantwoordelijkeForm.patchValue({
      tweedetshirt: !value
    });
  }
  changeLunch() {
    let value = this.verantwoordelijkeForm.get('lunchpakket').value;
    this.verantwoordelijkeForm.patchValue({
      lunchpakket: !value
    });
  }

}
