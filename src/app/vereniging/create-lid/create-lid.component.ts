import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerenigingService } from '../vereniging.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-lid',
  templateUrl: './create-lid.component.html',
  styleUrls: ['./create-lid.component.scss']
})
export class CreateLidComponent implements OnInit {

  lidForm = new FormGroup({
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
    wachtwoord: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    qrcode: new FormControl(null),
    foto: new FormControl(null),
    tshirt_id: new FormControl(null),
    rol_id: new FormControl(null),
  });
  tshirts: any = [];
  lid: any = {};
  constructor(private readonly verenigingService: VerenigingService, private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null || id !== '') {
    }
    this.verenigingService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );
  }

  changeTshirt() {
    let value = this.lidForm.get('tweedetshirt').value;
    this.lidForm.patchValue({
      tweedetshirt: !value
    });
  }
  changeLunch() {
    let value = this.lidForm.get('lunchpakket').value;
    this.lidForm.patchValue({
      lunchpakket: !value
    });
  }

  createLid() {
    this.verenigingService.addLid(this.lidForm.value).subscribe(
      () => {
        this.router.navigate(['/leden']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
