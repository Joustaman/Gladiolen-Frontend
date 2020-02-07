import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manage-taken',
  templateUrl: './manage-taken.component.html',
  styleUrls: ['./manage-taken.component.scss']
})
export class ManageTakenComponent implements OnInit {

  taken: any = [];
  taak: any = {};
  pageLoaded = false;

  constructor(private adminService: AdminService,
              private toastr: ToastrService, private readonly router: Router) {
  }

  ngOnInit() {
    this.getTaken();
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
        startDatum: taak.startDatum,
        eindDatum: taak.eindDatum,
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
        console.log(this.taken);
        this.pageLoaded = true;
      }
    );
  };
}
