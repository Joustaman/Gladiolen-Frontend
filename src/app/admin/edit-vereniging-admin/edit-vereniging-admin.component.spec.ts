import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVerenigingAdminComponent } from './edit-vereniging-admin.component';

describe('EditVerenigingAdminComponent', () => {
  let component: EditVerenigingAdminComponent;
  let fixture: ComponentFixture<EditVerenigingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVerenigingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVerenigingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
