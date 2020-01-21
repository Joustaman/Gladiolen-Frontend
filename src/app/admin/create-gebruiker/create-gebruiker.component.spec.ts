import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGebruikerComponent } from './create-gebruiker.component';

describe('CreateGebruikerComponent', () => {
  let component: CreateGebruikerComponent;
  let fixture: ComponentFixture<CreateGebruikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGebruikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGebruikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
