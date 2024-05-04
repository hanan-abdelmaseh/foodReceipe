import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/user/favorites/services/favorites.service';

@Component({
  selector: 'app-view-receipe',
  templateUrl: './view-receipe.component.html',
  styleUrls: ['./view-receipe.component.scss']
})
export class ViewReceipeComponent {
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../assets/images/dumy.jpg";
  constructor(
    public dialogRef: MatDialogRef<ViewReceipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private toastr: ToastrService , private _FavoritesService:FavoritesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
