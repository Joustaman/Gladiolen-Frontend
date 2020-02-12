import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVrijwilligerComponent } from './create-vrijwilliger.component';

describe('CreateVrijwilligerComponent', () => {
  let component: CreateVrijwilligerComponent;
  let fixture: ComponentFixture<CreateVrijwilligerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVrijwilligerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVrijwilligerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
