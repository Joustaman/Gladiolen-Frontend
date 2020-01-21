import { Component, OnInit } from '@angular/core';
import { VerenigingService } from '../vereniging.service';

@Component({
  selector: 'app-create-verantwoordelijke',
  templateUrl: './create-verantwoordelijke.component.html',
  styleUrls: ['./create-verantwoordelijke.component.scss']
})
export class CreateVerantwoordelijkeComponent implements OnInit {

  tshirts: any = [];
  constructor(private readonly verenigingService: VerenigingService) { }

  ngOnInit() {
    this.verenigingService.getTshirts().subscribe(
      result => {
        this.tshirts = result;
      },
    );
  }

}
