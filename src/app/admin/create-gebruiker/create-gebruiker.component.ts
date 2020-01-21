import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-gebruiker',
  templateUrl: './create-gebruiker.component.html',
  styleUrls: ['./create-gebruiker.component.scss']
})
export class CreateGebruikerComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

}
