import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerenigingComponent } from './create-vereniging.component';

describe('CreateVerenigingComponent', () => {
  let component: CreateVerenigingComponent;
  let fixture: ComponentFixture<CreateVerenigingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVerenigingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVerenigingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
