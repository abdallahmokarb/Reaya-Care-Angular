import { TestBed } from '@angular/core/testing';

import { SpecializationEnrichmentService } from './specialization-enrichment-service';

describe('SpecializationEnrichmentService', () => {
  let service: SpecializationEnrichmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationEnrichmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
