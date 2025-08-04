import { TestBed } from '@angular/core/testing';

import { AidoctorService } from './aidoctor-service';

describe('AidoctorService', () => {
  let service: AidoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AidoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
