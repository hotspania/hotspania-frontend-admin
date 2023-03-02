import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateListadoComponent } from './modal-create-listado.component';

describe('ModalCreateListadoComponent', () => {
  let component: ModalCreateListadoComponent;
  let fixture: ComponentFixture<ModalCreateListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateListadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
