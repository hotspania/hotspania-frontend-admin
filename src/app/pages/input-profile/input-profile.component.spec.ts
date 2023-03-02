import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProfileComponent } from './input-profile.component';

describe('InputProfileComponent', () => {
  let component: InputProfileComponent;
  let fixture: ComponentFixture<InputProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
