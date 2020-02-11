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
  kernleden: any = [];
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
    actief: new FormControl(false)
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router,
              private readonly route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (params.get('id') !== null) {
          this.adminService.getVerenigingByIdMetLeden(params.get('id')).subscribe(
            result => {
              this.vereniging = result;
              this.leden = result.gebruikers;
              this.fillForm();
              this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      });

    this.adminService.getKernleden().subscribe(
      result => {
        this.kernleden = result;
      },
      error => {
        console.log(error);
      },
    );
  }

  fillForm() {
    console.log(this.vereniging);

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
      actief: this.vereniging.actief
    });
  }

  updateVereniging() {
    this.adminService.updateVereniging(this.vereniging.id, this.verenigingForm.value).subscribe(
      result => {
        this.toastr.success('Verenigingen geupdate');
        this.router.navigate(['manageVerenigingen']);
      },
      error => {
        console.log(error);
      }
    );
  }

  changeActief() {
    let value = this.verenigingForm.get('actief').value;
    this.verenigingForm.patchValue({
      actief: !value
    });
  }
}
