import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioListadosComponent } from './anuncio-listados.component';

describe('AnuncioListadosComponent', () => {
  let component: AnuncioListadosComponent;
  let fixture: ComponentFixture<AnuncioListadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioListadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
