import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltagComponent } from './modaltag.component';

describe('ModaltagComponent', () => {
  let component: ModaltagComponent;
  let fixture: ComponentFixture<ModaltagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaltagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
