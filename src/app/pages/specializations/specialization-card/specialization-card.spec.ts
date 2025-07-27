import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationCard } from './specialization-card';

describe('SpecializationCard', () => {
  let component: SpecializationCard;
  let fixture: ComponentFixture<SpecializationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
