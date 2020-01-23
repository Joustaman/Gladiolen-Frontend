import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVerenigingenComponent } from './manage-verenigingen.component';

describe('ManageVerenigingenComponent', () => {
  let component: ManageVerenigingenComponent;
  let fixture: ComponentFixture<ManageVerenigingenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVerenigingenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVerenigingenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
