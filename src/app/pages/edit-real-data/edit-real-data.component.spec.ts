import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRealDataComponent } from './edit-real-data.component';

describe('EditRealDataComponent', () => {
  let component: EditRealDataComponent;
  let fixture: ComponentFixture<EditRealDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRealDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRealDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
