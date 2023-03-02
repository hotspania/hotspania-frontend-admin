import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePublicacionesComponent } from './manage-publicaciones.component';

describe('ManagePublicacionesComponent', () => {
  let component: ManagePublicacionesComponent;
  let fixture: ComponentFixture<ManagePublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePublicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
