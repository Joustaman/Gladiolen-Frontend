import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-aanvraag-vereniging',
  templateUrl: './aanvraag-vereniging.component.html',
  styleUrls: ['./aanvraag-vereniging.component.scss']
})
export class AanvraagVerenigingComponent implements OnInit {
  verenigingen: any[];
  contactpersonen: any[];
  contacts: any = {};

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private readonly toastr: ToastrService,
    private router: Router
  ) {
  }

  verenigingForm = new FormGroup({
    naam: new FormControl(''),
    hoofdverantwoordelijke: new FormControl(null),
    tweedeverantwoordelijke: new FormControl(null),
    rekeningnr: new FormControl(''),
    btwnr: new FormControl(''),
    straat: new FormControl(''),
    huisnummer: new FormControl(''),
    gemeente: new FormControl(''),
    postcode: new FormControl('')
  });

  @Output() notificationChanged: EventEmitter<String> = new EventEmitter();

  ngOnInit() {
    this.verenigingen = this.route.snapshot.data['verenigingen'];
    this.contactpersonen = this.route.snapshot.data['contactpersonen'];
    console.log(this.contactpersonen);
  }

  changeContact(event: any) {
    console.log(event);
    let eventid = event.target.name;
    let contactId = event.target.value;
    this.contacts[eventid] = contactId;
    console.log(this.contacts);
  }

  accept(id) {
    if (this.contacts[id] && this.contacts[id] !== '-1') {
      this.toastr.success('Vereniging goedgekeurd!', '', {timeOut: 2000});
      this.adminService.acceptVereningInAanvraag(id, this.contacts[id]).subscribe(r => {
        this.updateVerenigingen();
      });
    } else {
      this.toastr.error('Je moet een contactpersoon voor deze vereniging aanduiden!', '', {timeOut: 2000});
    }
  }

  deny(id) {
    this.toastr.info('Vereniging geweigerd', '', {timeOut: 2000});
    this.adminService.denyVereningInAanvraag(id).subscribe(r => {
      this.updateVerenigingen();
    });
  }

  private updateVerenigingen() {
    this.adminService.getVerenigingenInAanvraag().subscribe(res => {
      this.verenigingen = res;
      this.notificationChanged.emit(res.length === 0 ? '' : res.length + '');
      if (res.length === 0) {
        this.router.navigateByUrl('/adminHome');
      }
    });
  }

  onClickVerenigingAanvraag(vereniging) {
    this.verenigingForm.patchValue({
      naam: vereniging.naam,
      hoofdverantwoordelijke: vereniging.hoofd.voornaam + ' ' + vereniging.hoofd.name,
      tweedeverantwoordelijke: vereniging.tweedeverantwoordelijke,
      rekeningnr: vereniging.rekeningnr,
      btwnr: vereniging.btwnr,
      straat: vereniging.straat,
      huisnummer: vereniging.huisnummer,
      gemeente: vereniging.gemeente,
      postcode: vereniging.postcode
    });
  }
}
