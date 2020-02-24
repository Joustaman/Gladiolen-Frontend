import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {generateBuildStats} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/stats';
import { HotTableRegisterer } from '@handsontable/angular';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manage-tijdsregistraties',
  templateUrl: './manage-tijdsregistraties.component.html',
  styleUrls: ['./manage-tijdsregistraties.component.scss']
})
export class ManageTijdsregistratiesComponent implements OnInit {
  tijdsregistraties: any = [];
  tijdsregistratie: any = {};
  pageLoaded = false;
  verenigingen: any = [];
  verenigingLeden: any = [];
  verenigingLid: any = {name: 'test'};
  vereniging: any = {name: 'test'};
  evenementen: any = [];
  evenement: any = {naam: 'test'};
  gebruikers: any = [];
  gebruiker: any = {name: 'test'};
  str = '';
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  data: any = [];
  colHeaders = ['Lid', 'Vereniging', 'Evenement', 'Check-In', 'Check-Out', 'Manuele Check-In',
  'Manuele Check-Out', 'Aangepaste Check-In', 'Aangepaste Check-Out', 'Finale Check-In', 'Finale Check-Uit'];
  excelModus = false;
  columns: any = [
    {data: 'lid', readOnly: true},
    {data: 'vereniging', readOnly: true},
    {data: 'evenement', readOnly: true},
    {data: 'checkin', readOnly: true},
    {data: 'checkuit', readOnly: true},
    {data: 'manuelecheckin', readOnly: true},
    {data: 'manuelecheckuit', readOnly: true},
    {data: 'aangepastecheckin', readOnly: true},
    {data: 'aangepastecheckuit', readOnly: true},
    {data: 'finaleCheckIn', readOnly: true},
    {data: 'finaleCheckUit', readOnly: true},
  ];

  tijdsregistratieForm = new FormGroup({
    gebruiker_id: new FormControl(''),
    vereniging_id: new FormControl(''),
    evenement_id: new FormControl(''),
    checkIn: new FormControl(''),
    checkUit: new FormControl(''),
    manCheckIn: new FormControl(''),
    manCheckUit: new FormControl(''),
    adminCheckIn: new FormControl(''),
    adminCheckUit: new FormControl('')
  });

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private readonly router: Router,
    private readonly datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.getTijdsregistraties();
    this.getEvenementen();
    this.getGebruikers();
    this.getVerenigingen();
  }

  changeExcel() {
    this.excelModus = !this.excelModus;
  }
  createDataForTable(apiData: any) {
    apiData.forEach(tr => {
      let finaleCheckIn;
      let finaleCheckUit;

      if (tr.adminCheckIn !== null) {
        finaleCheckIn = tr.adminCheckIn;
      } else if (tr.manCheckIn !== null) {
        finaleCheckIn = tr.manCheckIn;
      } else if (tr.checkIn !== null) {
        finaleCheckIn = tr.checkIn;
      }

      if (tr.adminCheckUit !== null) {
        finaleCheckUit = tr.adminCheckUit;
      } else if (tr.manCheckUit !== null) {
        finaleCheckUit = tr.manCheckUit;
      } else if (tr.checkUit !== null) {
        finaleCheckUit = tr.checkUit;
      }

      this.data.push({
        lid: tr.gebruiker.name + ' ' + tr.gebruiker.voornaam,
        evenement: tr.evenement.naam,
        vereniging: tr.vereniging.naam,
        checkin: tr.checkIn,
        checkuit: tr.checkUit,
        manuelecheckin: tr.manCheckIn,
        manuelecheckuit: tr.manCheckUit,
        aangepastecheckin: tr.adminCheckIn,
        aangepastecheckuit: tr.adminCheckUit,
        finaleCheckIn,
        finaleCheckUit,
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
      filename:   'Tijdsregistraties_[YYYY]-[MM]-[DD]',
      mimeType: 'text/csv',
    });
  }
  updateTijdsregistratie() {
    console.log(this.tijdsregistratieForm.value);
    this.adminService.updateTijdsregistratie(this.tijdsregistratie.id, this.tijdsregistratieForm.value).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Tijdsregistratie geupdate');
      },
      error => {
        console.log(error);
      }
    );
    this.getTijdsregistraties();
  }

  createTijdsregistratie() {
    console.log(this.tijdsregistratieForm.value);
    this.adminService.createTijdsregistraties(this.tijdsregistratieForm.value).subscribe(
      result => {
        this.toastr.success('Succesvol toegevoegd');
        console.log(result);

      },
      error => {
        this.toastr.error('Vul het formulier correct in');
        console.log(error);
      }
    );

    this.getTijdsregistraties();

  }


  onClickEditTijdsregistratie(tijdsregistratie: any) {
    this.tijdsregistratieForm.patchValue({
      gebruiker_id: tijdsregistratie.gebruiker_id,
      vereniging_id: tijdsregistratie.vereniging_id,
      evenement_id: tijdsregistratie.evenement_id,
      checkIn: tijdsregistratie.checkIn,
      checkUit: tijdsregistratie.checkUit,
      manCheckIn: tijdsregistratie.manCheckIn,
      manCheckUit: tijdsregistratie.manCheckUit,
      adminCheckIn: this.datepipe.transform(tijdsregistratie.adminCheckIn, 'yyyy-MM-ddTHH:mm'),
      adminCheckUit: this.datepipe.transform(tijdsregistratie.adminCheckUit, 'yyyy-MM-ddTHH:mm')
    });
    this.evenement = this.evenementen.find(
      (evenement) => evenement.id === tijdsregistratie.evenement_id
    );
    this.gebruiker = this.gebruikers.find(
      gebruiker => gebruiker.id === tijdsregistratie.gebruiker_id
    );
    this.vereniging = this.verenigingen.find(
      vereniging => vereniging.id === tijdsregistratie.vereniging_id
    );
    console.log(this.evenement);
    console.log(this.gebruiker);
    console.log(this.vereniging);
    this.tijdsregistratie = tijdsregistratie;
  }

  getTijdsregistraties(){
    this.adminService.getTijdsregistraties().subscribe(result => {
      this.tijdsregistraties = result;
      this.createDataForTable(result);
      this.pageLoaded = true;
      console.log(result);
    });
  }
  getEvenementen() {
    this.adminService.getEvenementen().subscribe(result => {
      this.evenementen = result;
      console.log(result);
      this.pageLoaded = true;
    });
  }

  getVerenigingen() {
    this.adminService.getVerenigingen().subscribe(result => {
      this.verenigingen = result;
      console.log(result);
      this.pageLoaded = true;
    });
  }
  getVerenigingByIdMetLeden(id){
    this.adminService.getVerenigingByIdMetLeden(id).subscribe(result=>
    {
      this.verenigingLeden = result;
      console.log(result);
      this.pageLoaded = true;
    });
  }

  getGebruikers() {
    this.adminService.getGebruikers().subscribe(result => {
      console.log(result);
      this.gebruikers = result;
      this.pageLoaded = true;
    });
  }

  changeGebruiker() {
    let value = this.tijdsregistratieForm.get('gebruiker_id').value;
    console.log(this.gebruiker.id);
    this.tijdsregistratieForm.patchValue({
      gebruiker_id: !value
    });
  }

  changeVereniging() {
    // let value = this.tijdsregistratieForm.get('vereniging_id').value;
    // this.tijdsregistratieForm.patchValue({
    //   vereniging_id: !value
    // });
    this.getVerenigingByIdMetLeden(this.tijdsregistratieForm.get('vereniging_id').value);
  }

  changeEvenement() {
    let value = this.tijdsregistratieForm.get('evenement_id').value;
    this.tijdsregistratieForm.patchValue({
      evenement_id: !value
    });
  }

  clearTijdsregistratieForm() {
    this.tijdsregistratieForm.patchValue({
      gebruiker_id: '',
      vereniging_id: '',
      evenement_id: '',
      checkIn: '',
      checkUit: '',
      manCheckIn: '',
      manCheckUit: '',
      adminCheckIn: '',
      adminCheckUit: ''
    });
  }
}
