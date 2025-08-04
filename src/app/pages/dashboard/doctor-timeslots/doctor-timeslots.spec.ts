import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorTimeslots } from './doctor-timeslots';

describe('DoctorTimeslots', () => {
  let component: DoctorTimeslots;
  let fixture: ComponentFixture<DoctorTimeslots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorTimeslots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorTimeslots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
