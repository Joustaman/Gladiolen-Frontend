import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTijdsregistratiesComponent } from './manage-tijdsregistraties.component';

describe('ManageTijdsregistratiesComponent', () => {
  let component: ManageTijdsregistratiesComponent;
  let fixture: ComponentFixture<ManageTijdsregistratiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTijdsregistratiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTijdsregistratiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
