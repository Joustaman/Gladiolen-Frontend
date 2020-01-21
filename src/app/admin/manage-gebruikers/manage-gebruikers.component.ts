import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-gebruikers',
  templateUrl: './manage-gebruikers.component.html',
  styleUrls: ['./manage-gebruikers.component.scss']
})
export class ManageGebruikersComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }
}
