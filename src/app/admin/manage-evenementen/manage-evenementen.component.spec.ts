import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEvenementenComponent } from './manage-evenementen.component';

describe('ManageEvenementenComponent', () => {
  let component: ManageEvenementenComponent;
  let fixture: ComponentFixture<ManageEvenementenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEvenementenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEvenementenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
