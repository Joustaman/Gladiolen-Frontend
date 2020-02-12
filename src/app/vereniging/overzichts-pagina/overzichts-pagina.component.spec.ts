import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverzichtsPaginaComponent } from './overzichts-pagina.component';

describe('OverzichtsPaginaComponent', () => {
  let component: OverzichtsPaginaComponent;
  let fixture: ComponentFixture<OverzichtsPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverzichtsPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverzichtsPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
