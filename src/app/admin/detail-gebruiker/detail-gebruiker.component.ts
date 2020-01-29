import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-detail-gebruiker',
  templateUrl: './detail-gebruiker.component.html',
  styleUrls: ['./detail-gebruiker.component.scss']
})
export class DetailGebruikerComponent implements OnInit {

  gebruiker: any = {};
  pageLoaded = false;

  gebruikerForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol_id: new FormControl(''),
    rijksregisternr: new FormControl(''),
    password: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(null),
    foto: new FormControl(null),
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router,
              private readonly route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
        params => {
          if (params.get('id') !== null) {
            this.adminService.getGebruiker(params.get('id')).subscribe(
                result => {
                  this.gebruiker = result;
                  this.fillForm();
                  this.pageLoaded = true;
                  console.log(result);
                },
                error => {
                  console.log(error);
                },
            );
          }
        });
  }

  fillForm() {
    this.gebruikerForm.patchValue({
      name: this.gebruiker.name,
      voornaam: this.gebruiker.voornaam,
      roepnaam: this.gebruiker.roepnaam,
      geboortedatum: this.gebruiker.geboortedatum,
      email: this.gebruiker.email,
      telefoon: this.gebruiker.telefoon,
      opmerking: this.gebruiker.opmerking,
      rol_id: this.gebruiker.rol_id,
      rijksregisternr: this.gebruiker.rijksregisternr,
      lunchpakket: this.gebruiker.lunchpakket,
      actief: this.gebruiker.actief,
      foto: this.gebruiker.foto
    });
  }

}
