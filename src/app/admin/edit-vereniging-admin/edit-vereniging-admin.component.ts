import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-edit-vereniging-admin',
  templateUrl: './edit-vereniging-admin.component.html',
  styleUrls: ['./edit-vereniging-admin.component.scss']
})
export class EditVerenigingAdminComponent implements OnInit {

  vereniging: any = {};
  leden: any = [];
  pageLoaded = false;

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

  constructor(private readonly adminService: AdminService, private readonly router: Router,
              private readonly route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (params.get('id') !== null) {
          this.adminService.getVereniging(params.get('id')).subscribe(
            result => {
              this.vereniging = result;
              this.fillForm();
              this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      });
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
    this.adminService.updateVereniging(this.vereniging.id, this.verenigingForm.value).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Verening geupdate');
        this.router.navigate(['manageVerenigingen']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
