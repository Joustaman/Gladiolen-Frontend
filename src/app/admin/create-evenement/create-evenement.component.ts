import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-evenement',
  templateUrl: './create-evenement.component.html',
  styleUrls: ['./create-evenement.component.scss']
})
export class CreateEvenementComponent implements OnInit {

  constructor(private readonly adminService: AdminService) { }

  evenementForm = new FormGroup({
    naam: new FormControl(''),
    startdatum: new FormControl(''),
    einddatum: new FormControl(''),
    actief: new FormControl(''),

  });
  ngOnInit() {
  }
  submitForm() {
    this.adminService.registreerGebruiker(this.evenementForm.value).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
    );
  }
  changeActief() {
    let value = this.evenementForm.get('actief').value;
    this.evenementForm.patchValue({
      actief: !value
    });
  }
}
