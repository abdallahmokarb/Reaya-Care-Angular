import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Specializations } from './specializations';

describe('Specializations', () => {
  let component: Specializations;
  let fixture: ComponentFixture<Specializations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Specializations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Specializations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
