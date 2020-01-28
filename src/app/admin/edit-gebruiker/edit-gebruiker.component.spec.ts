import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGebruikerComponent } from './edit-gebruiker.component';

describe('EditGebruikerComponent', () => {
  let component: EditGebruikerComponent;
  let fixture: ComponentFixture<EditGebruikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGebruikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
