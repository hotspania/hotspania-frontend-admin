import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceProfileComponent } from './finance-profile.component';

describe('FinanceProfileComponent', () => {
  let component: FinanceProfileComponent;
  let fixture: ComponentFixture<FinanceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
