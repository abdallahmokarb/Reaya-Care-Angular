import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProcessed } from './payment-callback';

describe('PaymentProcessed', () => {
  let component: PaymentProcessed;
  let fixture: ComponentFixture<PaymentProcessed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProcessed],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentProcessed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
