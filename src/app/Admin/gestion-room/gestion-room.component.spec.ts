import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRoomComponent } from './gestion-room.component';

describe('GestionRoomComponent', () => {
  let component: GestionRoomComponent;
  let fixture: ComponentFixture<GestionRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
