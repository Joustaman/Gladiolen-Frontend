import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-manage-gebruikers',
  templateUrl: './manage-gebruikers.component.html',
  styleUrls: ['./manage-gebruikers.component.scss']
})
export class ManageGebruikersComponent implements OnInit {

  gebruikers: any = [];
  pageLoaded = false;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getGebruikers().subscribe(
      result => {
        this.gebruikers = result;
        this.pageLoaded = true;
      },
    );
  }
}
