import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAnunciosComponent } from './configure-anuncios.component';

describe('ConfigureAnunciosComponent', () => {
  let component: ConfigureAnunciosComponent;
  let fixture: ComponentFixture<ConfigureAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
