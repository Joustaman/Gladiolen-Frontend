import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '../admin.service';
import {ToastrService} from 'ngx-toastr';
import {Router, Route, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-vereniging-admin',
  templateUrl: './create-vereniging-admin.component.html',
  styleUrls: ['./create-vereniging-admin.component.scss']
})
export class CreateVerenigingAdminComponent implements OnInit {

  tshirts: any = [];
  maat: any;
  geslacht: any;
  kernleden: any = [];
  pageLoaded = false;

  verenigingForm = new FormGroup({
    naam: new FormControl(''),
    hoofdverantwoordelijke: new FormControl(null),
    tweedeverantwoordelijke: new FormControl(null),
    contactpersoon: new FormControl(null),
    rekeningnr: new FormControl(''),
    btwnr: new FormControl(''),
    straat: new FormControl(''),
    huisnummer: new FormControl(''),
    gemeente: new FormControl(''),
    postcode: new FormControl(''),
    actief: new FormControl(true),
    inAanvraag: new FormControl(false)
  });

  verantwoordelijkeForm = new FormGroup({
    name: new FormControl(''),
    voornaam: new FormControl(''),
    roepnaam: new FormControl(''),
    geboortedatum: new FormControl(''),
    email: new FormControl(''),
    telefoon: new FormControl(''),
    opmerking: new FormControl(''),
    rol_id: new FormControl(''),
    rijksregisternr: new FormControl(''),
    password: new FormControl(null),
    eersteAanmelding: new FormControl(false),
    lunchpakket: new FormControl(false),
    actief: new FormControl(true),
    foto: new FormControl(null),
  });

  constructor(private adminService: AdminService, private toast: ToastrService,
              private readonly router: Router, private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.adminService.getKernleden().subscribe(
      result => {
        this.kernleden = result;
        this.adminService.getAdmins().subscribe(res=>{
          this.kernleden =this.kernleden.concat(res);
        });
        this.pageLoaded = true;
        console.log(result);
      },
    );

    this.adminService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );
  }

  changeContact() {
    let value = this.verenigingForm.get('contactpersoon').value;
  }

  createVereniging() {

    this.adminService.registreerVereniging(this.verenigingForm.value).subscribe(
      result => {
        this.toast.success('Uw aanvraag is verzonden');
        console.log(result);
        this.router.navigate(['/manageVerenigingen']);
      },
      error => {
        this.toast.error('Vul het formulier correct in');
        console.log(error);
      }
    );
  }

  changeLunch() {
    let value = this.verantwoordelijkeForm.get('lunchpakket').value;
    this.verantwoordelijkeForm.patchValue({
      lunchpakket: !value
    });
  }

  createVerantwoordelijke() {
    this.verantwoordelijkeForm.patchValue(
      {
        rol_id: 4,
      }
    );

    this.adminService.registreerVerantwoordelijke(this.verantwoordelijkeForm.value).subscribe(
      result => {
        this.verenigingForm.patchValue({
          hoofdverantwoordelijke: result.id,
        });
        this.createTshirt(result.id);
        console.log(result);
      },
      error => {
        console.log(error);
        if (error.error.message === 'email') {
          this.toast.error('Voer een geldige e-mail in');
        } else {
          this.toast.error('Uw gegevens zijn niet geldig in');
        }
      }
    );
  }

  createTshirt(gebruikerId) {
    let tshirt = {maat: this.maat, geslacht: this.geslacht, gebruiker_id: gebruikerId, tshirttype_id: null};

    this.adminService.createTshirt(tshirt).subscribe(
      result => {
        this.createVereniging();
        console.log(result);
      }
    );
  }
}
