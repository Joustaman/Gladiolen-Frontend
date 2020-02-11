import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../admin.service';
import { HotTableRegisterer } from '@handsontable/angular';
import * as Handsontable from 'handsontable';
import 'handsontable/languages/nl-NL';

@Component({
  selector: 'app-manage-gebruikers',
  templateUrl: './manage-gebruikers.component.html',
  styleUrls: ['./manage-gebruikers.component.scss']
})
export class ManageGebruikersComponent implements OnInit {

  gebruikers: any = [];
  pageLoaded = false;
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  data: any = [];
  colHeaders = [
    'Naam',
    'Voornaam',
    'Geboortedatum',
    'Rol',
    'Email',
    'Telefoon',
    'Opmerking',
    'Rijksregisternummer',
    'Actief',
  ];
  excelModus = false;
  columns: any = [
    { data: 'naam', readOnly: true },
    { data: 'voornaam', readOnly: true },
    { data: 'geboortedatum', readOnly: true },
    { data: 'rol', readOnly: true},
    { data: 'email', readOnly: true },
    { data: 'telefoon', readOnly: true },
    { data: 'opmerking', readOnly: true },
    { data: 'rijksregisternummer', readOnly: true },
    { data: 'actief', readOnly: true },
  ];
  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getGebruikers().subscribe(
      result => {
        console.log(result);
        this.gebruikers = result;
        this.createDataForTable(result);
        this.pageLoaded = true;
      },
    );
  }

  createDataForTable(apiData: any) {
    apiData.forEach(gebruiker => {
      this.data.push({
        naam: gebruiker.name,
        voornaam: gebruiker.voornaam,
        geboortedatum: gebruiker.geboortedatum,
        rol: gebruiker.rol.naam,
        email: gebruiker.email,
        telefoon: gebruiker.telefoon,
        opmerking: gebruiker.opmerking,
        rijksregisternummer: gebruiker.rijksregisternr,
        actief: gebruiker.actief === 1 ? 'Ja' : 'Nee',
      });
    });
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
      filename:   'Gebruikers_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }
}
