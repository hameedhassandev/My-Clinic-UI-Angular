import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAndReviewComponent } from './rate-and-review.component';

describe('RateAndReviewComponent', () => {
  let component: RateAndReviewComponent;
  let fixture: ComponentFixture<RateAndReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateAndReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateAndReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
