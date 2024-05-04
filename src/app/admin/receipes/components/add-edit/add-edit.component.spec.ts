import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADDEDITComponent } from './add-edit.component';

describe('ADDEDITComponent', () => {
  let component: ADDEDITComponent;
  let fixture: ComponentFixture<ADDEDITComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADDEDITComponent]
    });
    fixture = TestBed.createComponent(ADDEDITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
