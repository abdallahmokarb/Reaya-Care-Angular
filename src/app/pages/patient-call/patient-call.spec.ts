import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCall } from './patient-call';

describe('PatientCall', () => {
  let component: PatientCall;
  let fixture: ComponentFixture<PatientCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
