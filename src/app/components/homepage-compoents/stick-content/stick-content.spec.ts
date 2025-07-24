import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickContent } from './stick-content';

describe('StickContent', () => {
  let component: StickContent;
  let fixture: ComponentFixture<StickContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
