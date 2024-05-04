import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserREceipeComponent } from './view-user-receipe.component';

describe('ViewUserREceipeComponent', () => {
  let component: ViewUserREceipeComponent;
  let fixture: ComponentFixture<ViewUserREceipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserREceipeComponent]
    });
    fixture = TestBed.createComponent(ViewUserREceipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
