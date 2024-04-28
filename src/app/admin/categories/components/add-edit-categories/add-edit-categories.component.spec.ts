import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoriesComponent } from './add-edit-categories.component';

describe('AddEditCategoriesComponent', () => {
  let component: AddEditCategoriesComponent;
  let fixture: ComponentFixture<AddEditCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCategoriesComponent]
    });
    fixture = TestBed.createComponent(AddEditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
