import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ViewUserREceipeComponent } from 'src/app/user/receipes/components/view-user-receipe/view-user-receipe.component';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-view-fav-receipe',
  templateUrl: './view-fav-receipe.component.html',
  styleUrls: ['./view-fav-receipe.component.scss']
})
export class ViewFavReceipeComponent {
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../assets/images/dumy.jpg";

  listOfFav :any;
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

  getAllfavs(){
  
    this._FavoritesService.getAllfavorites().subscribe({
      //we need to pass token in header of interceptors to be able to see receipes
      next:(res)=>{
           console.log(res);
           this.listOfFav= res;
      
           console.log(this.listOfFav);
           console.log(this.listOfFav.data)
          
          
      },
      error:()=>{

      },
      complete:()=>{

      }
    });
}
  daletefromfave(id:any){
    this._FavoritesService.deletefav(id).subscribe({
      next:()=>{
        console.log("deleted");
        this.getAllfavs();
        this.onNoClick()
      } ,
      error:()=>{

      },complete:()=>{
    
      }
    });
    }
 
   
  
}
