import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Srcappcomponentsnavbar } from './navbar';

describe('Srcappcomponentsnavbar', () => {
  let component: Srcappcomponentsnavbar;
  let fixture: ComponentFixture<Srcappcomponentsnavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Srcappcomponentsnavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Srcappcomponentsnavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
