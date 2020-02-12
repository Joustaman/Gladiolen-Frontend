import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {VerenigingService} from '../vereniging.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-vereniging',
  templateUrl: './create-vereniging.component.html',
  styleUrls: ['./create-vereniging.component.scss']
})
export class CreateVerenigingComponent implements OnInit {

  tshirts: any = [];
  maat: any;
  geslacht: any;
  buttonEnabled: boolean = true;

  constructor(private readonly verenigingService: VerenigingService, private toast: ToastrService, private router: Router) {
  }

  verantwoordelijkeForm = new FormGroup({
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
    actief: new FormControl(null),
    foto: new FormControl(null)
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
    inAanvraag: new FormControl(true)
  });

  ngOnInit() {
    this.verenigingService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );
  }

  /**
   * Verandert de lunch-waarde van de verantwoordelijke van 0 naar 1 en omgekeerd.
   */
  changeLunch() {
    let value = this.verantwoordelijkeForm.get('lunchpakket').value;
    this.verantwoordelijkeForm.patchValue({
      lunchpakket: !value
    });
  }

  /**
   * Creëert een nieuwe verantwoordelijke en voert de functie createTshirt uit.
   */
  createVerantwoordelijke() {
    this.verenigingService.registreerVerantwoordelijke(this.verantwoordelijkeForm.value).subscribe(
      result => {
        this.verenigingForm.patchValue({
          hoofdverantwoordelijke: result.id,
        });
        this.createTshirt(result.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * @param {int} gebruikerId  Het ID van de verantwoordelijke voor wie het Tshirt-object wordt aangemaakt.
   * Creëert een nieuw Tshirt-object
   */
  createTshirt(gebruikerId) {
    let tshirt = {maat: this.maat, geslacht: this.geslacht, gebruiker_id: gebruikerId, tshirttype_id: null};

    this.verenigingService.createTshirt(tshirt).subscribe(
      result => {
        this.createVereniging();
        console.log(result);
      }
    );
  }

  /**
   * Creëert een nieuwe vereniging.
   */
  createVereniging() {
    this.buttonEnabled = false;

    this.verenigingService.registreerVereniging(this.verenigingForm.value).subscribe(
      result => {
        this.toast.success('Uw aanvraag is verzonden');
        this.router.navigate(['bevestigingAanvraag']);
      },
      error => {
        this.toast.error('Vul het formulier correct in');
        this.buttonEnabled = true;
      }
    );
  }
}
