import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { VerenigingService } from '../vereniging.service';
import 'handsontable/languages/nl-NL';
import Handsontable from 'handsontable';
import { CsvDataService } from 'src/app/csv-data.service';

@Component({
  selector: 'app-leden',
  templateUrl: './leden.component.html',
  styleUrls: ['./leden.component.scss']
})
export class LedenComponent implements OnInit {
  vereniging: any = {};
  leden: any = [];
  pageLoaded = false;
  data: any = [];
  colHeaders = [
    'Naam',
    'Voornaam',
    'Rijksregisternummer',
    'Geslacht',
    'Tshirt',
    'Acties'
  ];
  columns: any = [
    { data: 'naam', readOnly: true },
    { data: 'voornaam', readOnly: true },
    { data: 'rijksregisternr', readOnly: true },
    { data: 'geslacht', readOnly: true },
    { data: 'tshirt', readOnly: true },
    { data: 'acties', renderer: 'html', readOnly: true }
  ];
  language = 'nl-NL';

  @ViewChild('hot', { read: ViewContainerRef, static: false}) hot;

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
        tshirt: gebruiker.tshirts[0].maat,
        acties:
          '<a [routerLink]="[\'/editlid\',' +
          gebruiker.id +
          ']"' +
          'routerLinkActive="router-link-active" onclick="saveChanges()" class="edit">' +
          '<i class="material-icons" data-toggle="tooltip" title="Bewerken">&#xE254;</i></a>'
      });
    });
  }

  saveChanges() {
    console.log('ok');
  }

  export() {
    let exportdata = [...this.data];
    exportdata.forEach((d) => delete d.acties);
    CsvDataService.exportToCsv('leden_' + this.vereniging.naam + '.csv', this.data);
  }
}
