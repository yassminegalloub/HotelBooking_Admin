import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReceptionComponent } from './gestion-reception.component';

describe('GestionReceptionComponent', () => {
  let component: GestionReceptionComponent;
  let fixture: ComponentFixture<GestionReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
