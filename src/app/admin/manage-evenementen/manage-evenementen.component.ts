import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {DatePipe} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-evenementen',
  templateUrl: './manage-evenementen.component.html',
  styleUrls: ['./manage-evenementen.component.scss'],
  providers: [DatePipe]
})
export class ManageEvenementenComponent implements OnInit {

  evenementen: any = [];
  evenement: any = [];
  startdatum: any;
  einddatum: any;
  pageLoaded = false;
  actief: any;
  constructor(private adminService: AdminService, private readonly datepipe: DatePipe, private toastr: ToastrService, private readonly router: Router) {
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
          this.router.navigate(['manageEvenementen']);
        },
        error => {
          console.log(error);
        }
    );
  }

  ngOnInit() {
    this.adminService.getEvenementen().subscribe(
      result => {
        this.evenementen = result;
        console.log(result);
        this.pageLoaded = true;
      },

    );
  }
}
