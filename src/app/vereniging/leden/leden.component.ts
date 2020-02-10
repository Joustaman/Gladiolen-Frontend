import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { VerenigingService } from '../vereniging.service';
import 'handsontable/languages/nl-NL';
import { CsvDataService } from 'src/app/csv-data.service';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';

@Component({
  selector: 'app-leden',
  templateUrl: './leden.component.html',
  styleUrls: ['./leden.component.scss']
})
export class LedenComponent implements OnInit {
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  vereniging: any = {};
  leden: any = [];
  pageLoaded = false;
  data: any = [];
  colHeaders = [
    'Naam',
    'Voornaam',
    'Rijksregisternummer',
    'Geslacht',
    'Tshirt'
  ];
  columns: any = [
    { data: 'naam', readOnly: true },
    { data: 'voornaam', readOnly: true },
    { data: 'rijksregisternr', readOnly: true },
    { data: 'geslacht', readOnly: true },
    { data: 'tshirt', readOnly: true }
  ];
  dropdownMenu = true;
  language = 'nl-NL';
  excelModus = false;

  constructor(private readonly verenigingService: VerenigingService) {}

  ngOnInit() {
    this.verenigingService.getVerenigingMetLeden().subscribe(
      result => {
        console.log(result.gebruikers);
        // TODO LEDEN IS NIET MEER NODIG
        this.leden = result.gebruikers;
        this.vereniging = result;
        this.createDataForTable(result.gebruikers);
        this.pageLoaded = true;
      },
      error => {
        console.log(error);
      }
    );
  }
  /**
   * * @param {int} id  Het ID van de gebruiker die verwijderd wordt.
   * Deletet de informatie van een lid.
   */
  deleteLid(id) {
    this.verenigingService.deleteLid(id).subscribe(
      () => {
        this.pageLoaded = false;
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  createDataForTable(apiData: any) {
    apiData.forEach(gebruiker => {
      this.data.push({
        naam: gebruiker.name,
        voornaam: gebruiker.voornaam,
        rijksregisternr: gebruiker.rijksregisternr,
        geslacht: gebruiker.tshirts[0].geslacht,
        tshirt: gebruiker.tshirts[0].maat
      });
    });
  }

  saveChanges() {
    console.log(this.hotRegisterer.getInstance(this.id).getData());
  }

  export() {
    // let exportdata = [...this.data];
    // exportdata.forEach((d) => delete d.acties);
    // CsvDataService.exportToCsv('leden_' + this.vereniging.naam + '.csv', this.data);


    // access to exportFile plugin instance
    const exportPlugin = this.hotRegisterer.getInstance(this.id).getPlugin('exportFile');

    exportPlugin.downloadFile('csv', {
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: this.vereniging.naam + '_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }
}
