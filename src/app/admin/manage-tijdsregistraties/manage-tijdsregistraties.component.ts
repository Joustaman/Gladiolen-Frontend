import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { generateBuildStats } from '@angular-devkit/build-angular/src/angular-cli-files/utilities/stats';

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
  vereniging: any = { name: 'test' };
  evenementen: any = [];
  evenement: any = { naam: 'test' };
  gebruikers: any = [];
  gebruiker: any = { name: 'test' };
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
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.adminService.getTijdsregistraties().subscribe(result => {
      this.tijdsregistraties = result;
      this.pageLoaded = true;
      console.log(result);
    });
    this.getEvenementen();
    this.getGebruikers();
    this.getVerenigingen();
  }


  updateTijdsregistratie() {
    console.log(this.tijdsregistratieForm.value);
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
  createTijdsregistratie(){
      console.log(this.tijdsregistratieForm.value);
      this.adminService.createTijdsregistraties(this.tijdsregistratieForm.value).subscribe(
          result=> {
              this.toastr.success('Succesvol toegevoegd');
              console.log(result);

          },
          error => {
              this.toastr.error('Vul het formulier correct in');
              console.log(error);
          }
      );
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
      adminCheckIn: tijdsregistratie.adminCheckIn,
      adminCheckUit: tijdsregistratie.adminCheckUit
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

  getGebruikers() {
    this.adminService.getGebruikers().subscribe(result => {
      console.log(result);
      this.gebruikers = result;
      this.pageLoaded = true;
    });
  }
    changeGebruiker() {
        let value = this.tijdsregistratieForm.get('gebruiker_id').value;
        console.log(this.gebruiker.id)
        this.tijdsregistratieForm.patchValue({
            gebruiker_id: !value
    });
    }
    changeVereniging() {
        let value = this.tijdsregistratieForm.get('vereniging_id').value;
        this.tijdsregistratieForm.patchValue({
            vereniging_id: !value
        });
    }
    changeEvenement() {
        let value = this.tijdsregistratieForm.get('evenement_id').value;
        this.tijdsregistratieForm.patchValue({
            evenement_id: !value
        });
    }
}
