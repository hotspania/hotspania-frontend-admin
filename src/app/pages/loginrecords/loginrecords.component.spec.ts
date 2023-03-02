import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginrecordsComponent } from './loginrecords.component';

describe('LoginrecordsComponent', () => {
  let component: LoginrecordsComponent;
  let fixture: ComponentFixture<LoginrecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginrecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
