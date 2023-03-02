import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownImagesComponent } from './down-images.component';

describe('DownImagesComponent', () => {
  let component: DownImagesComponent;
  let fixture: ComponentFixture<DownImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
