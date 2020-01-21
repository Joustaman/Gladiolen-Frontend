import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGebruikersComponent } from './manage-gebruikers.component';

describe('ManageGebruikersComponent', () => {
  let component: ManageGebruikersComponent;
  let fixture: ComponentFixture<ManageGebruikersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGebruikersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGebruikersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
