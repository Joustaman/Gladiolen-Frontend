import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLidVerenigingComponent } from './create-lid-vereniging.component';

describe('CreateLidVerenigingComponent', () => {
  let component: CreateLidVerenigingComponent;
  let fixture: ComponentFixture<CreateLidVerenigingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLidVerenigingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLidVerenigingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
