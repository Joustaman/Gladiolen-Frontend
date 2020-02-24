import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGebruikerComponent } from './detail-gebruiker.component';

describe('DetailGebruikerComponent', () => {
  let component: DetailGebruikerComponent;
  let fixture: ComponentFixture<DetailGebruikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGebruikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
