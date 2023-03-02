import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioGeneralComponent } from './anuncio-general.component';

describe('AnuncioGeneralComponent', () => {
  let component: AnuncioGeneralComponent;
  let fixture: ComponentFixture<AnuncioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
