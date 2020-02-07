import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTakenComponent } from './manage-taken.component';

describe('ManageTakenComponent', () => {
  let component: ManageTakenComponent;
  let fixture: ComponentFixture<ManageTakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
