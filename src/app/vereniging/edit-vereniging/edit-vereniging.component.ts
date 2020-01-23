import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerenigingService } from '../vereniging.service';
import { CreateLidComponent } from '../create-lid/create-lid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-vereniging',
  templateUrl: './edit-vereniging.component.html',
  styleUrls: ['./edit-vereniging.component.scss']
})
export class EditVerenigingComponent implements OnInit {

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
  });
  vereniging: any = {};
  leden: any = [];
  pageLoaded = false;
  constructor(private readonly verenigingsService: VerenigingService, private readonly router: Router) { }

  ngOnInit() {
    this.verenigingsService.getVerenigingMetLeden().subscribe(
      result => {
        this.vereniging = result;
        this.leden = result.gebruikers;
        this.fillForm();
        this.pageLoaded = true;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  fillForm() {
    this.verenigingForm.patchValue({
      naam: this.vereniging.naam,
      hoofdverantwoordelijke: this.vereniging.hoofdverantwoordelijke,
      tweedeverantwoordelijke: this.vereniging.tweedeverantwoordelijke,
      contactpersoon: this.vereniging.contactpersoon,
      rekeningnr: this.vereniging.rekeningnr,
      btwnr: this.vereniging.btwnr,
      straat: this.vereniging.straat,
      huisnummer: this.vereniging.huisnummer,
      gemeente: this.vereniging.gemeente,
      postcode: this.vereniging.postcode,
    });
  }

  updateVereniging() {
    this.verenigingsService.updateVereniging(this.vereniging.id, this.verenigingForm.value).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['keuzemenu']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
