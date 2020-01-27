import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ToastrService} from 'ngx-toastr';
import { Router, Route, ActivatedRoute } from '@angular/router';
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
    actief: new FormControl(false),
    inAanvraag: new FormControl(false)
  });

  constructor(private adminService: AdminService, private toast: ToastrService, private readonly router: Router, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  createVereniging() {

    this.adminService.registreerVereniging(this.verenigingForm.value).subscribe(
      result => {
        this.toast.success('Uw aanvraag is verzonden');
        console.log(result);
        this.router.navigate(['/manageVerenigingen']);
      },
      error => {
        this.toast.error('Vul het formulier correct in');
        console.log(error);
      }
    );
  }
}
