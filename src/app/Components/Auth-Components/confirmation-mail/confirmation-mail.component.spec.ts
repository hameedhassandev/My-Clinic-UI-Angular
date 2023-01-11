import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationMailComponent } from './confirmation-mail.component';

describe('ConfirmationMailComponent', () => {
  let component: ConfirmationMailComponent;
  let fixture: ComponentFixture<ConfirmationMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
