import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerenigingService } from '../vereniging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-vereniging',
  templateUrl: './create-vereniging.component.html',
  styleUrls: ['./create-vereniging.component.scss']
})
export class CreateVerenigingComponent implements OnInit {

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
  verenigingForm = new FormGroup({
    naam: new FormControl(''),
    hoofdverantwoordelijke: new FormControl(null),
    tweedeverantwoordelijke: new FormControl(null),
    contactpersoon: new FormControl(null),
    rekeningnr: new FormControl(''),
    btwnr: new FormControl(''),
    straat: new FormControl(''),
    huisnummer: new FormControl(''),
    gemeente: new FormControl(''),
    postcode: new FormControl(''),
    actief: new FormControl(false),
  });

  tshirts: any = [];
  constructor(private readonly verenigingService: VerenigingService, private toast: ToastrService) { }

  ngOnInit() {
    this.verenigingService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
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

  createVerantwoordelijke() {
    console.log("test");
    this.verenigingService.registreerVerantwoordelijke(this.verantwoordelijkeForm.value).subscribe(
      result => {
        this.verenigingForm.patchValue({
          hoofdverantwoordelijke: result.id,
        });
        this.createVereniging();
      },
      error => {
        console.log(error);
      }
    );
  }

  createVereniging() {
    this.verenigingService.registreerVereniging(this.verenigingForm.value).subscribe(
      result => {
        this.toast.success('Uw aanvraag is verzonden');
        console.log(result);
      },
      error => {
        this.toast.error('Vul het formulier correct in');
        console.log(error);
      }
    );
  }

}
