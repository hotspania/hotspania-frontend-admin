import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFinancesComponent } from './general-finances.component';

describe('GeneralFinancesComponent', () => {
  let component: GeneralFinancesComponent;
  let fixture: ComponentFixture<GeneralFinancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralFinancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
