import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsColletionComponent } from './tags-colletion.component';

describe('TagsColletionComponent', () => {
  let component: TagsColletionComponent;
  let fixture: ComponentFixture<TagsColletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsColletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsColletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
