import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { VerenigingService } from '../vereniging/vereniging.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  user: any = {};
  hwachtwoord: any = null;
  userForm = new FormGroup({
    name: new FormControl(''),
    roepnaam: new FormControl(''),
    voornaam: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    geboortedatum: new FormControl(''),
    rijksregisternr: new FormControl(''),
    opmerking: new FormControl(''),
    password: new FormControl(null),
  });
  pageLoaded = false;
  constructor(private readonly authService: AuthService,
              private readonly verenigingService: VerenigingService,
              private readonly datepipe: DatePipe,
              private readonly toastr: ToastrService,
              private readonly router: Router) { }
  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getIngelogdeGebruiker().subscribe(
      result => {
        this.user = result;
        this.fillForm(result);
        this.pageLoaded = true;
      }
    );
  }

  fillForm(user) {
    this.userForm.patchValue({
      name: user.name,
      roepnaam: user.roepnaam,
      voornaam: user.voornaam,
      email: user.email,
      telefoon: user.telefoon,
      geboortedatum: this.datepipe.transform(user.geboortedatum, 'yyyy-MM-dd'),
      rijksregisternr: user.rijksregisternr,
      opmerking: user.opmerking,
    });
  }

  updateProfiel() {
    console.log(this.userForm.value);
    if (this.hwachtwoord !== this.userForm.get('password').value) {
      this.toastr.error('Wachtwoorden komen niet overeen');
    } else {
      this.authService.updateProfiel(this.userForm.value).subscribe(
        () => {
          this.toastr.success('Profiel bijgewerkt');
          this.router.navigate(['keuzemenu']);
        }
      );
    }
  }
}
