import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-lid-vereniging',
  templateUrl: './create-lid-vereniging.component.html',
  styleUrls: ['./create-lid-vereniging.component.scss']
})
export class CreateLidVerenigingComponent implements OnInit {

  tshirts: any = [];
  rollen: any = [];
  vereniging: any = {};
  gebruiker: any = {};
  maat: any;
  geslacht: any;
  pageLoaded = false;

  gebruikerForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol_id: new FormControl(null),
    rijksregisternr: new FormControl(''),
    password: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null),
  });

  constructor(private readonly adminService: AdminService, private readonly router: Router,
    private readonly route: ActivatedRoute, private readonly toast: ToastrService) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        if (params.get('id') !== null) {
          this.adminService.getVereniging(params.get('id')).subscribe(
            result => {
              console.log(result);
              this.vereniging = result;
              this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      });

    this.adminService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );

    this.adminService.getRollen().subscribe(
      result => {
        this.rollen = result;
      },
    );
  }

  submitForm() {
    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        console.log(error);
        this.toast.error('Vul het formulier correct in');
      }
    );
  }
  createGebruiker() {
    this.adminService.registreerGebruiker(this.gebruikerForm.value).subscribe(
      result => {
        this.createTshirt(result.id);
      },
      error => {
        console.log(error);
        this.toast.error('Vul het formulier correct in');
      }
    );
  }

  createTshirt(gebruikerId) {
    let tshirt = {maat: this.maat, geslacht: this.geslacht, gebruiker_id: gebruikerId, tshirttype_id: null};

    this.adminService.createTshirt(tshirt).subscribe(
      () => {
        this.toast.success('Lid aangemaakt');
        this.router.navigate(['/manageGebruikers']);
      }
    );
  }

  changeTshirt() {
    let value = this.gebruikerForm.get('tweedetshirt').value;
    this.gebruikerForm.patchValue({
      tweedetshirt: !value
    });
  }

  changeLunch() {
    let value = this.gebruikerForm.get('lunchpakket').value;
    this.gebruikerForm.patchValue({
      lunchpakket: !value
    });
  }

  changeRol() {
    let value = this.gebruikerForm.get('rol_id').value;
  }

}
