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

  tshirts: any = [];
  lid: any = {};
  verenigingId: any;
  rol: any;
  updateGebruiker = false;
  pageLoaded = false;
  maat: any;
  geslacht: any;

  constructor(private readonly verenigingService: VerenigingService, private readonly router: Router,
    private readonly route: ActivatedRoute, private readonly datepipe: DatePipe,
    private readonly toast: ToastrService) { }

  lidForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol_id: new FormControl(null),
    rijksregisternr: new FormControl(''),
    password: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null),
  });

  ngOnInit() {
    this.verenigingService.getRolVanIngelogdeGebruiker().subscribe(
      result => {
        this.rol = result;
      }
    );
    this.route.paramMap.subscribe(
      params => {
        if (params.get('verenigingId') !== null) {
          this.verenigingId = params.get('verenigingId');
        }
        if (params.get('id') !== null) {
          this.verenigingService.getLid(params.get('id')).subscribe(
            result => {
              this.lid = result;
              this.fillForm();
              this.updateGebruiker = true;
              this.pageLoaded = true;
            }
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
  /**
   * Verandert de lunch-waarde van de gebruiker 0 naar 1 en omgekeerd.
   */
  changeLunch() {
    let value = this.lidForm.get('lunchpakket').value;
    this.lidForm.patchValue({
      lunchpakket: !value
    });
  }
  /**
   * Creëert een nieuwe vrijwilliger en voert de functie createTshirt uit.
   * Als admin (rol == 1) voer je addLidAdmin uit, met het verenigingId van de geselecteerde vereniging.
   * Als Verantwoordelijke (rol == 3) voer je addLid uit (binnen zijn eigen vereniging).
   */
  createLid() {
    if (this.verenigingId !== null) {
        if (this.rol == 1) {
          this.verenigingService.addLidAdmin(this.lidForm.value, this.verenigingId).subscribe(
            result => {
              this.createTshirt(result.id);
            },
            error => {
              this.toast.error('Vul het formulier correct in');
            }
          );
        }
        else if (this.rol == 3) {
          this.verenigingService.addLid(this.lidForm.value).subscribe(
            result => {
              this.createTshirt(result.id);
            },
            error => {
              this.toast.error('Vul het formulier correct in');
            }
          );
        }
      }
  }

  /**
   * @param {int} gebruikerId  Het ID van de gebruiker voor wie het Tshirt-object wordt aangemaakt.
   * Creëert een nieuw Tshirt-object
   */
  createTshirt(gebruikerId) {
    let tshirt = { maat: this.maat, geslacht: this.geslacht, gebruiker_id: gebruikerId, tshirttype_id: null };

    this.verenigingService.createTshirt(tshirt).subscribe(
      () => {
        this.toast.success('Lid aangemaakt');
        if(this.rol==1){
          this.router.navigate(['/leden/', this.verenigingId]);
        }
        else if(this.rol==3){
          this.router.navigate(['/leden']);
        }
        
      }
    );
  }

  /**
   * Updatet de informatie van een lid en voert de functie updateTshirt uit.
   */
  updateLid() {
    this.verenigingService.updateLid(this.lid.id, this.lidForm.value).subscribe(
      result => {
        this.updateTshirt();
      }
    );
  }

  /**
   * Updatet het Tshirt-object van de geselecteerde gebruiker.
   */
  updateTshirt() {
    let tshirt = { maat: this.maat, geslacht: this.geslacht, gebruiker_id: this.lid.id, tshirttype_id: null };
    this.verenigingService.updateTshirt(this.lid.id, tshirt).subscribe(
      result =>  {
        this.toast.success('Lid geupdate');
        this.router.navigate(['/leden/',this.verenigingId]);
      }
    );
  }
  /**
   * Vult het update-formulier op met de huidige informatie van de geselecteerde gebruiker.
   */
  fillForm() {
    this.lidForm.patchValue({
      name: this.lid.name,
      voornaam: this.lid.voornaam,
      roepnaam: this.lid.roepnaam,
      geboortedatum: this.datepipe.transform(this.lid.geboortedatum, 'yyyy-MM-dd'),
      email: this.lid.email,
      telefoon: this.lid.telefoon,
      opmerking: this.lid.opmerking,
      rol_id: this.lid.rol_id,
      rijksregisternr: this.lid.rijksregisternr,
      password: null,
      eersteAanmelding: this.lid.eersteAanmelding,
      lunchpakket: this.lid.lunchpakket,
      actief: this.lid.actief,
      foto: this.lid.foto,
    });
    this.maat = this.lid.tshirts[0].maat;
    this.geslacht = this.lid.tshirts[0].geslacht;
  }
}
