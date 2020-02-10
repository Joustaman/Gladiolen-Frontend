import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manage-taken',
  templateUrl: './manage-taken.component.html',
  styleUrls: ['./manage-taken.component.scss'],
  providers: [DatePipe]
})
export class ManageTakenComponent implements OnInit {

  taak: any = {};
  taken: any = [];
  taakgroepen: any = [];
  subtaken: any = [];
  pageLoaded = false;

  constructor(private adminService: AdminService, private readonly datepipe: DatePipe,
              private toastr: ToastrService, private readonly router: Router) {
  }

  ngOnInit() {
    this.getTaken();
    this.getTaakgroepen();
    this.getSubtaken();
  }

  taakForm = new FormGroup({
    subtaak_id: new FormControl(''),
    taakgroep_id: new FormControl(''),
    startDatum: new FormControl(''),
    eindDatum: new FormControl(''),
    aantalPersonen: new FormControl(''),
  });

  onSubmit() {
    this.adminService.createTaak(this.taakForm.value).subscribe(
      result => {
        this.toastr.success('Taak toegevoegd');
        this.getTaken();
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickEditTaak(taak: any) {
    this.taakForm.patchValue({
        subtaak_id: taak.subtaak_id,
        taakgroep_id: taak.taakgroep_id,
        startDatum: this.datepipe.transform(taak.startDatum, 'yyyy-MM-dd'),
        eindDatum: this.datepipe.transform(taak.eindDatum, 'yyyy-MM-dd'),
        aantalPersonen: taak.aantalPersonen
      }
    );
    this.taak = taak;
  }

  updateTaak() {
    this.adminService.updateTaak(this.taak.id, this.taakForm.value).subscribe(
      result => {
        this.toastr.success('Taak geupdate');
        this.getTaken();
      },
      error => {
        console.log(error);
      }
    );
  }

  getTaken() {
    this.adminService.getTaken().subscribe(
      result => {
        this.taken = result;
        this.pageLoaded = true;
      }
    );
  };

  getTaakgroepen() {
    this.adminService.getTaakgroepen().subscribe(
      result => {
        this.taakgroepen = result;
        this.pageLoaded = true;
      }
    );
  };

  getSubtaken() {
    this.adminService.getSubtaken().subscribe(
      result => {
        this.subtaken = result;
        this.pageLoaded = true;
      }
    );
  };
}
