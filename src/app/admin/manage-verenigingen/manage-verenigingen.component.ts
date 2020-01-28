import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manage-verenigingen',
  templateUrl: './manage-verenigingen.component.html',
  styleUrls: ['./manage-verenigingen.component.scss']
})
export class ManageVerenigingenComponent implements OnInit {
  verenigingen: any = [];
  pageLoaded = false;
  leden: any = [];

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

  onClickDetailVereniging(vereniging: any) {
    this.verenigingForm.patchValue({
        naam: vereniging.naam,
        hoofdverantwoordelijke: vereniging.hoofd.name,
        tweedeverantwoordelijke: vereniging.tweede.name,
        contactpersoon: vereniging.contactpersoon.name,
        rekeningnr: vereniging.rekeningnr,
        btwnr: vereniging.btwnr,
        straat: vereniging.straat,
        huisnummer: vereniging.huisnummer,
        gemeente: vereniging.gemeente,
        postcode: vereniging.postcode,
        actief: vereniging.actief
      }
    );
  }

  ngOnInit() {
    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
        this.pageLoaded = true;
        console.log(result);
      },
    );
  }

}
