import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditListadoComponent } from './modal-edit-listado.component';

describe('ModalEditListadoComponent', () => {
  let component: ModalEditListadoComponent;
  let fixture: ComponentFixture<ModalEditListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
