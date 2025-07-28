import { TestBed } from '@angular/core/testing';

import { DoctorInfoService } from './doctor-info-service';

describe('DoctorInfoService', () => {
  let service: DoctorInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
