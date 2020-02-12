import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-vereniging-leden-admin',
  templateUrl: './manage-vereniging-leden-admin.component.html',
  styleUrls: ['./manage-vereniging-leden-admin.component.scss']
})
export class ManageVerenigingLedenAdminComponent implements OnInit {

  gebruikers: any = [];
  pageLoaded = false;

  constructor(private adminService: AdminService, private readonly router: Router,
    private readonly route: ActivatedRoute) { }
 
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (params.get('id') !== null) {
              this.adminService.getVrijwilligersByVereniging(params.get('id')).subscribe(
                result => {
                  console.log(result);
                  this.gebruikers = result;
                  this.pageLoaded = true;
            },
            error => {
              console.log(error);
            },
          );
        }
      });
    }

}

  
