import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAsVisitorComponent } from './register-as-visitor.component';

describe('RegisterAsVisitorComponent', () => {
  let component: RegisterAsVisitorComponent;
  let fixture: ComponentFixture<RegisterAsVisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAsVisitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAsVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
