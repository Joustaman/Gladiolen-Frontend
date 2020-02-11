import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVerenigingLedenAdminComponent } from './manage-vereniging-leden-admin.component';

describe('ManageVerenigingLedenAdminComponent', () => {
  let component: ManageVerenigingLedenAdminComponent;
  let fixture: ComponentFixture<ManageVerenigingLedenAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVerenigingLedenAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVerenigingLedenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
