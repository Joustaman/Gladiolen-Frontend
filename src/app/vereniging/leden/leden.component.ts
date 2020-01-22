import { Component, OnInit } from '@angular/core';
import { VerenigingService } from '../vereniging.service';

@Component({
  selector: 'app-leden',
  templateUrl: './leden.component.html',
  styleUrls: ['./leden.component.scss']
})
export class LedenComponent implements OnInit {

  leden: any = [];
  pageLoaded = false;

  constructor(private readonly verenigingService: VerenigingService) { }

  ngOnInit() {
    this.verenigingService.getLeden().subscribe(
      result => {
        console.log(result.gebruikers);
        this.leden = result.gebruikers;
        this.pageLoaded = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteLid(id) {
    this.verenigingService.deleteLid(id).subscribe(
      () => {
        this.pageLoaded = false;
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

}
