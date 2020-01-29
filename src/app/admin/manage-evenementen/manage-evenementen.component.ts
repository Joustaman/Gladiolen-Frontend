import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
  evenementVerenigingen: any = [];

  constructor(private adminService: AdminService, private readonly datepipe: DatePipe, private toastr: ToastrService, private readonly router: Router) {
  }

  evenementForm = new FormGroup({
    naam: new FormControl(''),
    startdatum: new FormControl(''),
    einddatum: new FormControl(''),
    actief: new FormControl(false),
  });

  toewijzenVerenigingForm = new FormGroup({
    vereniging: new FormControl('')
  });

  evenementId: any;


  onSubmit() {
    this.adminService.registreerEvenement(this.evenementForm.value).subscribe(
      result => {
        console.log(result);
        this.pageLoaded = false;
        this.getEvenementen();
      },
      error => {
        console.log(error);
      }
    );
  }

  changeEvenementId(id, evenement) {
    this.evenementId = id;
    this.evenement = evenement;
    if(this.evenement !== null) {
      this.evenementVerenigingen = evenement.verenigingen;
    }
  }

  onClickEditEvenement(evenement: any) {
    this.evenementForm.patchValue({
        naam: evenement.naam,
        startdatum: this.datepipe.transform(evenement.startdatum, 'yyyy-MM-dd'),
        einddatum: this.datepipe.transform(evenement.einddatum, 'yyyy-MM-dd'),
        actief: evenement.actief,

      }
    );
    this.evenement = evenement;
  }

  changeActief() {
    let value = this.evenementForm.get('actief').value;
    this.evenementForm.patchValue({
      actief: !value
    });
  }

  updateEvenement() {
    this.adminService.updateEvenement(this.evenement.id, this.evenementForm.value).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Verening geupdate');
        this.getEvenementen();
      },
      error => {
        console.log(error);
      }
    );
  }

  changeVereniging() {
    this.vereniging = this.toewijzenVerenigingForm.get('vereniging').value;
  }

  toewijzenVerenigingen() {
    const data = {verenigingid: this.vereniging, evenementid: this.evenementId };
    this.adminService.registreerEvenementVereniging(data).subscribe(
      result => {
        console.log(result);
        this.getEvenementen();
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getEvenementen();
    this.getVerenigingen();
  }

  getEvenementen() {
    this.adminService.getEvenementen().subscribe(
      result => {
        this.evenementen = result;
        if(this.evenement !== null) {
          this.evenement = this.evenementen.find((evenement) => evenement.id === this.evenementId);
          this.changeEvenementId(this.evenementId, this.evenement);
        }
        console.log(result);
        this.pageLoaded = true;
      },
    );
  }

  getVerenigingen() {
    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
      },
    );
  }

  verwijderVerenigingVanEvenement(verenigingId) {
    const ids = {verenigingid: verenigingId, evenementid: this.evenementId};
    console.log(ids);
    this.adminService.deleteVerenigingFromEvenement(ids).subscribe(
      result => {
        console.log(result);
        this.getEvenementen();
      },
      error => {
        console.log(error);
      }
    );
  }
}
