import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastInputsComponent } from './last-inputs.component';

describe('LastInputsComponent', () => {
  let component: LastInputsComponent;
  let fixture: ComponentFixture<LastInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
