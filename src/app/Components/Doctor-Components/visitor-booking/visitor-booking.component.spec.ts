import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorBookingComponent } from './visitor-booking.component';

describe('VisitorBookingComponent', () => {
  let component: VisitorBookingComponent;
  let fixture: ComponentFixture<VisitorBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
