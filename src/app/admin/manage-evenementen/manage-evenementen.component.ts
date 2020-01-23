import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manage-evenementen',
  templateUrl: './manage-evenementen.component.html',
  styleUrls: ['./manage-evenementen.component.scss'],
  providers: [DatePipe]
})
export class ManageEvenementenComponent implements OnInit {

  evenement: any = {};
  evenementen: any = [];
  startdatum: any;
  einddatum: any;
  pageLoaded = false;

  constructor(private adminService: AdminService) {
  }

  evenementForm = new FormGroup({
    naam: new FormControl(''),
    startdatum: new FormControl(''),
    einddatum: new FormControl(''),
    actief: new FormControl(false),
  });

  onSubmit() {
    this.adminService.registreerEvenement(this.evenementForm.value).subscribe(
      result => {
        console.log(result);
        this.pageLoaded = false;
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickEditEvenement(evenement: any) {
    this.evenementForm.patchValue(evenement);
    this.startdatum = this.startdatum.transform(evenement.startdatum, 'yyyy-MM-dd');
    this.einddatum = this.einddatum.transform(evenement.einddatum, 'yyyy-MM-dd');
  }

  changeActief() {
    let value = this.evenementForm.get('actief').value;
    this.evenementForm.patchValue({
      actief: !value
    });
  }

  ngOnInit() {
    this.adminService.getEvenementen().subscribe(
      result => {
        this.evenementen = result;
        this.pageLoaded = true;
      },
    );
  }
}
