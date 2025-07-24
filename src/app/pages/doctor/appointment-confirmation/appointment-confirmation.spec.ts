import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentConfirmation } from './appointment-confirmation';

describe('AppointmentConfirmation', () => {
  let component: AppointmentConfirmation;
  let fixture: ComponentFixture<AppointmentConfirmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentConfirmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentConfirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
