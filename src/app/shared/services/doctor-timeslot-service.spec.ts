import { TestBed } from '@angular/core/testing';

import { DoctorTimeslotService } from './doctor-timeslot-service';

describe('DoctorTimeslotService', () => {
  let service: DoctorTimeslotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorTimeslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
