import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-create-vereniging-admin',
  templateUrl: './create-vereniging-admin.component.html',
  styleUrls: ['./create-vereniging-admin.component.scss']
})
export class CreateVerenigingAdminComponent implements OnInit {

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
    actief: new FormControl(false)
  });

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
  }

  createVereniging() {
    this.adminService.registreerVereniging(this.verenigingForm.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
}
