import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLidComponent } from './create-lid.component';

describe('CreateLidComponent', () => {
  let component: CreateLidComponent;
  let fixture: ComponentFixture<CreateLidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
