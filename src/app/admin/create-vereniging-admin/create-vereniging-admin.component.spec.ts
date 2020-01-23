import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerenigingAdminComponent } from './create-vereniging-admin.component';

describe('CreateVerenigingAdminComponent', () => {
  let component: CreateVerenigingAdminComponent;
  let fixture: ComponentFixture<CreateVerenigingAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVerenigingAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVerenigingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
