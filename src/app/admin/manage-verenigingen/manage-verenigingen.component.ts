import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as Handsontable from 'handsontable';
import {HotTableRegisterer} from '@handsontable/angular';
import 'handsontable/languages/nl-NL';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manage-verenigingen',
  templateUrl: './manage-verenigingen.component.html',
  styleUrls: ['./manage-verenigingen.component.scss']
})
export class ManageVerenigingenComponent implements OnInit {

  email: any = {};
  verenigingen: any = [];
  pageLoaded = false;
  str = '';
  p:any;
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  data: any = [];
  colHeaders = [
    'Naam',
    'Hoofdverantwoordelijke',
    'Contactpersoon',
    'Rekeningnummer',
    'Btw nummer',
    'Straat',
    'Huisnummer',
    'Gemeente',
    'Postcode',
    'Actief',
  ];
  columns: any = [
    {data: 'naam', readOnly: true},
    {data: 'hoofdverantwoordelijke', readOnly: true},
    {data: 'contactpersoon', readOnly: true},
    {data: 'rekeningnummer', readOnly: true},
    {data: 'btwnummer', readOnly: true},
    {data: 'straat', readOnly: true},
    {data: 'huisnummer', readOnly: true},
    {data: 'gemeente', readOnly: true},
    {data: 'postcode', readOnly: true},
    {data: 'actief', readOnly: true},
  ];
  excelModus = false;

  verenigingForm = new FormGroup({
    naam: new FormControl(''),
    hoofdverantwoordelijke: new FormControl(null),
    tweedeverantwoordelijke: new FormControl(null),
    contact: new FormControl(null),
    rekeningnr: new FormControl(''),
    btwnr: new FormControl(''),
    straat: new FormControl(''),
    huisnummer: new FormControl(''),
    gemeente: new FormControl(''),
    postcode: new FormControl(''),
    actief: new FormControl(false)
  });

  gebruikerForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol: new FormControl(null),
    rijksregisternr: new FormControl(''),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null),
    tshirt: new FormControl(null)
  });

  constructor(private adminService: AdminService,
              private readonly datepipe: DatePipe) {
  }

  ngOnInit() {
    this.adminService.getGeacepteerdeVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
        this.createDataForTable(result);
        this.pageLoaded = true;
      },
    );
  }

  onClickDetailVereniging(vereniging: any) {
    let contact;
    let tweede;

    if (vereniging.contact === null) {
      contact = 'Geen contactpersoon';
    } else {
      contact = vereniging.contact.voornaam + ' ' + vereniging.contact.name;
    }

    if (vereniging.tweede === null) {
      tweede = 'Geen tweede verantwoordelijke';
    } else {
      tweede = vereniging.tweede.voornaam + ' ' + vereniging.tweede.name;
    }

    this.verenigingForm.patchValue({
        naam: vereniging.naam,
        hoofdverantwoordelijke: vereniging.hoofd.voornaam + ' ' + vereniging.hoofd.name,
        tweedeverantwoordelijke: tweede,
        contact: contact,
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

  onClickDetailGebruiker(gebruiker) {
    this.email = "mailto:" + gebruiker.email;

    this.gebruikerForm.patchValue({
      name: gebruiker.name,
      voornaam: gebruiker.voornaam,
      roepnaam: gebruiker.roepnaam,
      geboortedatum: this.datepipe.transform(
        gebruiker.geboortedatum,
        'yyyy-MM-dd'
      ),
      email: gebruiker.email,
      telefoon: gebruiker.telefoon,
      opmerking: gebruiker.opmerking,
      rijksregisternr: gebruiker.rijksregisternr
    });
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }

  createDataForTable(apiData: any) {
    apiData.forEach(vereniging => {
      this.data.push({
        naam: vereniging.naam,
        hoofdverantwoordelijke: vereniging.hoofd.name + ' ' + vereniging.hoofd.voornaam,
        contactpersoon: vereniging.contact.name + ' ' + vereniging.contact.voornaam,
        rekeningnummer: vereniging.rekeningnr,
        btwnummer: vereniging.btwnr,
        straat: vereniging.straat,
        huisnummer: vereniging.huisnummer,
        gemeente: vereniging.gemeente,
        postcode: vereniging.postcode,
        actief: vereniging.actief === 1 ? 'Ja' : 'Nee',
      });
    });
  }

  export() {
    const exportPlugin = this.hotRegisterer.getInstance(this.id).getPlugin('exportFile');

    exportPlugin.downloadFile('csv', {
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: 'Verenigingen_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }
}
