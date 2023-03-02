import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFakeDataComponent } from './edit-fake-data.component';

describe('EditFakeDataComponent', () => {
  let component: EditFakeDataComponent;
  let fixture: ComponentFixture<EditFakeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFakeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
