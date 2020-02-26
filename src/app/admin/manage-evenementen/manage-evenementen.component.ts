import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {HotTableRegisterer} from '@handsontable/angular';

@Component({
  selector: 'app-manage-evenementen',
  templateUrl: './manage-evenementen.component.html',
  styleUrls: ['./manage-evenementen.component.scss'],
  providers: [DatePipe]
})
export class ManageEvenementenComponent implements OnInit {
  verenigingen: any = [];
  vereniging: any = {};
  toegewezenVerenigingen: any = [];
  evenementen: any = [];
  evenement: any = null;
  startdatum: any;
  einddatum: any;
  pageLoaded = false;
  actief: any;
  test = '';
  str = '';
  p:any;
  evenementVerenigingen: any = [];
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  data: any = [];
  colHeaders = ['Naam', 'Startdatum', 'Einddatum', 'Actief', 'Verenigingen'];
  excelModus = false;
  columns: any = [
    {data: 'naam', readOnly: true},
    {data: 'startdatum', readOnly: true},
    {data: 'einddatum', readOnly: true},
    {data: 'actief', readOnly: true},
    {data: 'verenigingen', readOnly: true}
  ];

  constructor(
    private adminService: AdminService,
    private readonly datepipe: DatePipe,
    private toastr: ToastrService,
    private readonly router: Router
  ) {
  }

  evenementForm = new FormGroup({
    naam: new FormControl(''),
    startdatum: new FormControl(''),
    einddatum: new FormControl(''),
    actief: new FormControl(false)
  });

  toewijzenVerenigingForm = new FormGroup({
    vereniging: new FormControl('')
  });

  evenementId: any;

  onSubmit() {
    this.adminService.registreerEvenement(this.evenementForm.value).subscribe(
      result => {
        this.getEvenementen();
      }
    );
  }

  changeEvenementId(id, evenement) {
    this.evenementId = id;
    this.evenement = evenement;
    if (this.evenement !== null) {
      this.evenementVerenigingen = evenement.verenigingen;
    }
  }

  onClickEditEvenement(evenement: any) {
    this.evenementForm.patchValue({
      naam: evenement.naam,
      startdatum: this.datepipe.transform(evenement.startdatum, 'yyyy-MM-dd'),
      einddatum: this.datepipe.transform(evenement.einddatum, 'yyyy-MM-dd'),
      actief: evenement.actief
    });
    this.evenement = evenement;
    if(evenement.actief === false|| evenement.actief === 1){
      this.test="Actief";
    }
    else if(evenement.actief === true|| evenement.actief === 0){
      this.test="Niet Actief";
    }
  }

  changeActief() {
    let value = this.evenementForm.get('actief').value;

    this.evenementForm.patchValue({
      actief: !value

    });
    if(value === false|| value === 0){
      this.test="Actief";
    }
    else if(value === true|| value === 1){
      this.test="Niet Actief";
    }
  }

  updateEvenement() {
    this.adminService
      .updateEvenement(this.evenement.id, this.evenementForm.value)
      .subscribe(
        result => {
          this.toastr.success('Verening geupdate');
          this.getEvenementen();
        }
      );
  }

  changeVereniging() {
    this.vereniging = this.toewijzenVerenigingForm.get('vereniging').value;
  }

  toewijzenVerenigingen() {
    const data = {
      verenigingid: this.vereniging,
      evenementid: this.evenementId
    };
    this.adminService.registreerEvenementVereniging(data).subscribe(
      result => {
        this.getEvenementen();
      }
    );
  }

  ngOnInit() {
    this.getEvenementen();
    this.getVerenigingen();
  }

  getEvenementen() {
    this.adminService.getEvenementen().subscribe(result => {
      this.evenementen = result;
      this.createDataForTable(result);
      if (this.evenement !== null) {
        this.evenement = this.evenementen.find(
          evenement => evenement.id === this.evenementId
        );
        this.changeEvenementId(this.evenementId, this.evenement);
      }
      this.pageLoaded = true;
    });
  }

  getVerenigingen() {
    this.adminService.getVerenigingen().subscribe(result => {
      this.verenigingen = result;
    });
  }

  verwijderVerenigingVanEvenement(verenigingId) {
    const ids = {verenigingid: verenigingId, evenementid: this.evenementId};
    this.adminService.deleteVerenigingFromEvenement(ids).subscribe(
      result => {
        this.getEvenementen();
      }
    );
  }

  clearEvenementForm() {
    this.evenementForm.patchValue({
      naam: '',
      startdatum: '',
      einddatum: ''
    });
  }

  createDataForTable(apiData: any) {
    apiData.forEach(evenement => {
      let verenigingenString = '';
      evenement.verenigingen.forEach(verenigingg => {
        verenigingenString += verenigingg.naam + ';';
      });
      this.data.push({
        naam: evenement.naam,
        startdatum: this.datepipe.transform(evenement.startdatum, 'yyyy-MM-dd'),
        einddatum: this.datepipe.transform(evenement.einddatum, 'yyyy-MM-dd'),
        actief: evenement.actief === 1 ? 'Ja' : 'Nee',
        verenigingen: verenigingenString,
      });
    });
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }

  export() {
    const exportPlugin = this.hotRegisterer
      .getInstance(this.id)
      .getPlugin('exportFile');

    exportPlugin.downloadFile('csv', {
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: 'Evenementen_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv'
    });
  }

  fixPagination(){    
    if(this.str!==""){
        this.p=1;        
    }
  }
} 
