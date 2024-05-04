import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/user/favorites/services/favorites.service';

@Component({
  selector: 'app-view-user-receipe',
  templateUrl: './view-user-receipe.component.html',
  styleUrls: ['./view-user-receipe.component.scss']
})
export class ViewUserREceipeComponent {
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../assets/images/dumy.jpg";
  constructor(
    public dialogRef: MatDialogRef<ViewUserREceipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private toastr: ToastrService , private _FavoritesService:FavoritesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addToFav(favID:any){
    console.log("fav") ;
    this._FavoritesService.addtofav(favID).subscribe({
      next:()=>{
        this.toastr.success("Receipe has been added to Favorites ")
      },
      error:()=>{

      }
      ,complete:()=>{
        this.onNoClick();
      }
    });
  }
  
}
