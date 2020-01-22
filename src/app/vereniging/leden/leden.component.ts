import { Component, OnInit } from '@angular/core';
import { VerenigingService } from '../vereniging.service';

@Component({
  selector: 'app-leden',
  templateUrl: './leden.component.html',
  styleUrls: ['./leden.component.scss']
})
export class LedenComponent implements OnInit {

  leden: any = [];
  constructor(private readonly verenigingService: VerenigingService) { }

  ngOnInit() {
    this.verenigingService.getLeden().subscribe(
      result => {
        this.leden = result.gebruikers;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteLid(id) {
    this.verenigingService.deleteLid(id).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    );
  }

}
