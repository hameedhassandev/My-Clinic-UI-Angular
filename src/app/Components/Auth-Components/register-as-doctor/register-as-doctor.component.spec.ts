import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsDoctorComponent } from './register-as-doctor.component';

describe('RegisterAsDoctorComponent', () => {
  let component: RegisterAsDoctorComponent;
  let fixture: ComponentFixture<RegisterAsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAsDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
