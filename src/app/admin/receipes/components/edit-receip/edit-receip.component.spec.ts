import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceipComponent } from './edit-receip.component';

describe('EditReceipComponent', () => {
  let component: EditReceipComponent;
  let fixture: ComponentFixture<EditReceipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReceipComponent]
    });
    fixture = TestBed.createComponent(EditReceipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
