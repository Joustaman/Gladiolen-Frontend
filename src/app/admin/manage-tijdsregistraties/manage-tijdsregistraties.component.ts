import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
  vereniging: any = {};
  evenementen: any = [];
  evenement: any = null;

  constructor(private adminService: AdminService, private toastr: ToastrService, private readonly router: Router) {
  }

  ngOnInit() {
    this.adminService.getTijdsregistraties().subscribe(
      result => {
        this.tijdsregistraties = result;
        this.pageLoaded = true;
        console.log(result);
      },
    );
  }

  tijdsregistratieForm = new FormGroup({
    gebruiker: new FormControl(''),
    vereniging: new FormControl(''),
    evenement: new FormControl(''),
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    manCheckIn: new FormControl(''),
    manCheckOut: new FormControl(''),
    adminCheckIn: new FormControl(''),
    adminCheckOut: new FormControl(''),
  });

  updateTijdsregistratie() {
    this.adminService.updateTijdsregistratie(this.tijdsregistratie.id, this.tijdsregistratieForm.value).subscribe(
      result => {
        console.log(result);
        this.toastr.success('Verening geupdate');
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickEditTijdsregistratie(tijdsregistratie: any) {
    this.tijdsregistratieForm.patchValue({
        gebruiker: tijdsregistratie.gebruiker.name,
        vereniging: tijdsregistratie.vereniging.naam,
        evenement: tijdsregistratie.evenement.naam,
        checkIn: tijdsregistratie.checkIn,
        checkOut: tijdsregistratie.checkOut,
        manCheckIn: tijdsregistratie.manCheckIn,
        manCheckOut: tijdsregistratie.manCheckOut,
        adminCheckIn: tijdsregistratie.adminCheckIn,
        adminCheckOut: tijdsregistratie.adminCheckOut,
      }
    );

    this.tijdsregistratie = tijdsregistratie;
  }

  getEvenementen() {
    this.adminService.getEvenementen().subscribe(
      result => {
        this.evenementen = result;
        console.log(result);
        this.pageLoaded = true;
      },
    );
  }

  getVerenigingen() {
    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
        console.log(result);
        this.pageLoaded = true;
      },
    );
  }
}
