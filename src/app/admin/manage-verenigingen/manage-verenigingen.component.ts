import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import 'handsontable/languages/nl-NL';

@Component({
  selector: 'app-manage-verenigingen',
  templateUrl: './manage-verenigingen.component.html',
  styleUrls: ['./manage-verenigingen.component.scss']
})
export class ManageVerenigingenComponent implements OnInit {
  verenigingen: any = [];
  pageLoaded = false;
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
    { data: 'naam', readOnly: true },
    { data: 'hoofdverantwoordelijke', readOnly: true },
    { data: 'contactpersoon', readOnly: true },
    { data: 'rekeningnummer', readOnly: true },
    { data: 'btwnummer', readOnly: true },
    { data: 'straat', readOnly: true },
    { data: 'huisnummer', readOnly: true },
    { data: 'gemeente', readOnly: true },
    { data: 'postcode', readOnly: true },
    { data: 'actief', readOnly: true },
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

  constructor(private adminService: AdminService) {
  }

  createDataForTable(apiData: any) {
    apiData.forEach(vereniging => {
      this.data.push({
        naam: vereniging.naam,
        hoofdverantwoordelijke: vereniging.hoofd.name + vereniging.hoofd.voornaam,
        contactpersoon: vereniging.contact.name + vereniging.contact.voornaam,
        rekeningnummer: vereniging.rekeningnr,
        btwnummer: vereniging.btwnr,
        straat: vereniging.straat,
        huisnummer: vereniging.huisnummer,
        gemeente: vereniging.gemeente,
        postcode: vereniging.postcode,
        actief: vereniging.actief
      });
    });
  }
  onClickDetailVereniging(vereniging: any) {
    let contact;
    let tweede;

    if (vereniging.contact === null) {
      contact = 'Geen contactpersoon';
    } else {
      contact = vereniging.contact.name;
    }

    if (vereniging.tweede === null) {
      tweede = 'Geen tweede verantwoordelijke';
    } else {
      tweede = vereniging.tweede.name;
    }

    this.verenigingForm.patchValue({
        naam: vereniging.naam,
        hoofdverantwoordelijke: vereniging.hoofd.name,
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

  ngOnInit() {
    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
        this.createDataForTable(result);
        this.pageLoaded = true;
        console.log(result);
      },
    );
  }
  changeExcel() {
    this.excelModus = !this.excelModus;
  }
  export() {
    const exportPlugin = this.hotRegisterer.getInstance(this.id).getPlugin('exportFile');

    exportPlugin.downloadFile('csv', {
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename:   'Verenigingen_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }

}
