import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { VerenigingService } from '../vereniging.service';
import 'handsontable/languages/nl-NL';
import { CsvDataService } from 'src/app/csv-data.service';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import * as jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leden',
  templateUrl: './leden.component.html',
  styleUrls: ['./leden.component.scss']
})
export class LedenComponent implements OnInit {
  lidGekozen: boolean = false;
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  verenigingId: any;
  rol: any;
  vereniging: any = {};
  leden: any = [];
  lid: any = { id: 0 };
  pageLoaded = false;
  data: any = [];
  p:any;
  test = 'test';
  str = "";
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

  constructor(private readonly verenigingService: VerenigingService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }

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
          this.verenigingService.getVerenigingMetLedenById(params.get('verenigingId')).subscribe(
            result => {
              this.leden = result.gebruikers;
              this.vereniging = result;
              this.createDataForTable(result.gebruikers);
              this.pageLoaded = true;
            }
          );
        }
        else{
          this.verenigingService.getVerenigingMetLeden().subscribe(
            result => {
              this.leden = result.gebruikers;
              this.vereniging = result;
              this.createDataForTable(result.gebruikers);
              this.pageLoaded = true;
            }
          );
        }
      }
    );



    
  }

/*
  /**
   * * @param {int} id  Het ID van de gebruiker die verwijderd wordt.
   * Deletet de informatie van een lid.
   */
  deleteLid(id) {
    //Admin
    if(this.rol==1){
      this.verenigingService.deleteLidAdmin(id, this.verenigingId).subscribe(
        () => {
          this.pageLoaded = false;
          this.ngOnInit();
        },
        error => {
          console.log(error);
        }
      );
    }
    //Verenigingsverantwoordelijke
    else if(this.rol==3){
      console.log(this.rol)
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
  }

  createDataForTable(apiData: any) {
    apiData.forEach(gebruiker => {
      this.data.push({
        id: gebruiker.id,
        naam: gebruiker.name,
        voornaam: gebruiker.voornaam,
        rijksregisternr: gebruiker.rijksregisternr,
        geslacht: gebruiker.tshirts[0].geslacht,
        tshirt: gebruiker.tshirts[0].maat
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
      filename: this.vereniging.naam + '_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }

  exportQrCode() {
    const elementToPrint = document.getElementById('canvas');
    const qrCode = elementToPrint.firstChild.firstChild;
    const volledigeNaam = this.lid.voornaam + ' ' + this.lid.name;

    const pdf = new jsPDF('p', 'pt', 'a4');

    pdf.text(70, 70, volledigeNaam);
    pdf.addImage(qrCode, 'png', 20, 90, 550, 550);
    pdf.save('qrCode' + this.lid.voornaam + this.lid.name.replace(' ', '') + '.pdf');
  }

  exportAllQrCode() {
    const elementToPrint = document.getElementById('QR');
    const qrCodes = elementToPrint.childNodes;

    const pdf = new jsPDF('p', 'pt', 'a4');

    for (var i = 1; i < qrCodes.length; i++) {
      const volledigeNaam = this.leden[i - 1].voornaam + ' ' + this.leden[i - 1].name;
      const qrCode = qrCodes.item(i).lastChild.firstChild.firstChild;
      pdf.text(70, 70, volledigeNaam);
      pdf.addImage(qrCode, 'png', 20, 90, 550, 550);
      pdf.addPage();
    }

    pdf.save('qrCodes' + this.vereniging.naam + '.pdf');
  }

  onClickExportQRCode(lid) {
    this.lid = lid;
    this.lidGekozen = true;
  }

  changeToAll() {
    this.lidGekozen = false;
  }
  fixPagination(){    
    if(this.str!==""){
        this.p=1;        
    }
  }
}
