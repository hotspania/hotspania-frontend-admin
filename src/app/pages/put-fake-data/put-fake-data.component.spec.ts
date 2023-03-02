import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutFakeDataComponent } from './put-fake-data.component';

describe('PutFakeDataComponent', () => {
  let component: PutFakeDataComponent;
  let fixture: ComponentFixture<PutFakeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutFakeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutFakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
