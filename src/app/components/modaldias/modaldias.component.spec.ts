import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldiasComponent } from './modaldias.component';

describe('ModaldiasComponent', () => {
  let component: ModaldiasComponent;
  let fixture: ComponentFixture<ModaldiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
