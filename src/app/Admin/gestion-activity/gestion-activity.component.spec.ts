import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionActivityComponent } from './gestion-activity.component';

describe('GestionActivityComponent', () => {
  let component: GestionActivityComponent;
  let fixture: ComponentFixture<GestionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
