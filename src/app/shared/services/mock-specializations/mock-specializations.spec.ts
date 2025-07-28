import { TestBed } from '@angular/core/testing';

import { MockSpecializations } from './mock-specializations';

describe('MockSpecializations', () => {
  let service: MockSpecializations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSpecializations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
