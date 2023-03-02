import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultiPaqueteComponent } from './add-multi-paquete.component';

describe('AddMultiPaqueteComponent', () => {
  let component: AddMultiPaqueteComponent;
  let fixture: ComponentFixture<AddMultiPaqueteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultiPaqueteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultiPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
