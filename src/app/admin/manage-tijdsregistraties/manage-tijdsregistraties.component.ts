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
  tijdsregistratie: any = [];
  pageLoaded = false;
  constructor(private adminService: AdminService, private toastr: ToastrService, private readonly router: Router) { }

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
    checkin: new FormControl(''),
    checkout: new FormControl(''),
    manueleCheckin: new FormControl(''),
    manueleCheckout: new FormControl(''),
    adminCheckin: new FormControl(''),
    adminCheckout: new FormControl(''),
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
        console.log(tijdsregistratie);
        this.tijdsregistratieForm.patchValue({

            gebruiker: tijdsregistratie.gebruiker.name,
            vereniging: tijdsregistratie.vereniging.naam,
            evenement: tijdsregistratie.evenement.naam,
            checkIn: tijdsregistratie.checkIn,
            // checkOut: tijdsregistratie.checkOut,
            // manCheckIn: tijdsregistratie.manCheckIn,



            }
        );
        this.tijdsregistratie = tijdsregistratie;
    }
}
