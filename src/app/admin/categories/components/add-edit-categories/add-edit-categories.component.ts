import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.scss']
})
export class AddEditCategoriesComponent {
  constructor(
    public dialogRef: MatDialogRef<AddEditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
