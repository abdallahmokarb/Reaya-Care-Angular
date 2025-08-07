import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctor } from './admin-doctor';

describe('AdminDoctor', () => {
  let component: AdminDoctor;
  let fixture: ComponentFixture<AdminDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
