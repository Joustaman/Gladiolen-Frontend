import { Component, OnInit } from '@angular/core';
import {AdminService} from "../admin.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-evenement',
  templateUrl: './edit-evenement.component.html',
  styleUrls: ['./edit-evenement.component.scss']
})
export class EditEvenementComponent implements OnInit {

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
