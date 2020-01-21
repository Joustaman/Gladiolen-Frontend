import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVerantwoordelijkeComponent } from './create-verantwoordelijke.component';

describe('CreateVerantwoordelijkeComponent', () => {
  let component: CreateVerantwoordelijkeComponent;
  let fixture: ComponentFixture<CreateVerantwoordelijkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVerantwoordelijkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVerantwoordelijkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
