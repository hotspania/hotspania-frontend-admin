import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageuserloginComponent } from './imageuserlogin.component';

describe('ImageuserloginComponent', () => {
  let component: ImageuserloginComponent;
  let fixture: ComponentFixture<ImageuserloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageuserloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
