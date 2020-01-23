import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-manage-verenigingen',
  templateUrl: './manage-verenigingen.component.html',
  styleUrls: ['./manage-verenigingen.component.scss']
})
export class ManageVerenigingenComponent implements OnInit {

  verenigingen: any = [];
  pageLoaded = false;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.getVerenigingen().subscribe(
      result => {
        this.verenigingen = result;
        this.pageLoaded = true;
      },
    );
  }

}
