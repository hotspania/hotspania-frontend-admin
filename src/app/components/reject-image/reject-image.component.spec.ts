import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectImageComponent } from './reject-image.component';

describe('RejectImageComponent', () => {
  let component: RejectImageComponent;
  let fixture: ComponentFixture<RejectImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
