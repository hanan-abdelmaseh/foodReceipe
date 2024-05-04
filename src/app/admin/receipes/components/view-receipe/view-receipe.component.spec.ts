import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceipeComponent } from './view-receipe.component';

describe('ViewReceipeComponent', () => {
  let component: ViewReceipeComponent;
  let fixture: ComponentFixture<ViewReceipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceipeComponent]
    });
    fixture = TestBed.createComponent(ViewReceipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
