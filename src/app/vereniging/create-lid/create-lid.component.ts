import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VerenigingService } from '../vereniging.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-lid',
  templateUrl: './create-lid.component.html',
  styleUrls: ['./create-lid.component.scss'],
  providers: [DatePipe]
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
  updateGebruiker = false;
  pageLoaded = false;
  constructor(private readonly verenigingService: VerenigingService, private readonly router: Router,
              private readonly route: ActivatedRoute, private readonly datepipe: DatePipe,
              private readonly toast: ToastrService) { }


  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        console.log(params.get('id'));
        if (params.get('id') !== null) {
          this.verenigingService.getLid(params.get('id')).subscribe(
            result => {
              console.log(result);
              this.lid = result;
              this.fillForm();
              this.updateGebruiker = true;
              this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      }
    );

    this.verenigingService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
        this.pageLoaded = true;
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
        this.toast.success('Lid aangemaakt');
        this.router.navigate(['/leden']);
      },
      error => {
        console.log(error);
        this.toast.error('Vul het formulier correct in');
      }
    );
  }

  fillForm() {
    this.lidForm.patchValue({
      naam: this.lid.naam,
      voornaam: this.lid.voornaam,
      roepnaam: this.lid.roepnaam,
      straat: this.lid.straat,
      huisnummer: this.lid.huisnummer,
      geboortedatum: this.datepipe.transform(this.lid.geboortedatum, 'yyyy-MM-dd'),
      emailadres: this.lid.emailadres,
      telefoon: this.lid.telefoon,
      tweedetshirt: this.lid.tweedetshirt,
      opmerking: this.lid.opmerking,
      rijksregisternr: this.lid.rijksregisternr,
      postcode: this.lid.postcode,
      lunchpakket: this.lid.lunchpakket,
      tshirt_id: this.lid.tshirt_id,
      wachtwoord: this.lid.wachtwoord,
      eersteAanmelding: this.lid.eersteAanmelding,
      qrcode: this.lid.qrcode,
      foto: this.lid.foto,
      rol_id: this.lid.rol_id,
    });

  }

  updateLid() {
    this.verenigingService.updateLid(this.lid.id, this.lidForm.value).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/leden']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
