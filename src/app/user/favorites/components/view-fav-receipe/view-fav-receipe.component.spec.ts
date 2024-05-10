import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFavReceipeComponent } from './view-fav-receipe.component';

describe('ViewFavReceipeComponent', () => {
  let component: ViewFavReceipeComponent;
  let fixture: ComponentFixture<ViewFavReceipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFavReceipeComponent]
    });
    fixture = TestBed.createComponent(ViewFavReceipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
