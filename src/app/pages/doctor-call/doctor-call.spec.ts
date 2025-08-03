import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCall } from './doctor-call';

describe('DoctorCall', () => {
  let component: DoctorCall;
  let fixture: ComponentFixture<DoctorCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
