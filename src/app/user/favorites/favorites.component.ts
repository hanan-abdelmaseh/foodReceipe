import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { ITag } from 'src/app/admin/receipes/interfaces/model';
import { RecepiesService } from 'src/app/admin/receipes/services/Recepies.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewUserREceipeComponent } from '../receipes/components/view-user-receipe/view-user-receipe.component';
import { FavoritesService } from './services/favorites.service';
import { ViewFavReceipeComponent } from './components/view-fav-receipe/view-fav-receipe.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  pageNumber:number = 1;
  pageSize:number=10;

  imgURL:string= 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../assets/images/dumy.jpg";
  //search 
  SearchValue = '';
  tagId:number=0;
  CategoryID:number =0
  //categories will be changed
  //dialog 
  receipeItem: string= '' ;
  //show cards
  showcards:boolean = true;
  //


  listOfFav:any;
  listOfTags:ITag[]=[] ;
  listOfCategories:any[]=[];
  
  showfavs:boolean =false ;
  constructor(private  ReceipeService:RecepiesService , 
    private _CategoryService:CategoryService , public dialog: MatDialog ,  private _router:Router ,
      private toastr: ToastrService , private spinner: NgxSpinnerService, 
      private _FavoritesService:FavoritesService){}
  
  ngOnInit() {
  this.getAllfavs();
  this.getAllTags();
this.getAllCategories();
this.spinner.show();
 
setTimeout(() => {
  /** spinner ends after 5 seconds */
  this.showfavs=true;
  this.spinner.hide();
}, 2000);
  
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
   
 
  
  //delete receipe 

  openDeleteDialog(deltedId:number , name:string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id:deltedId , name:name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete  was closed');
       console.log( result);
       //check result 
       if(result){
        this.deleteReceipebyID(result)
        this.toastr.success('your Receipe deleted');
       }
      

    });
  }
  deleteReceipebyID(id:number){
    this.ReceipeService.deleteReceipe(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:()=>{},
      complete:()=>{
        this.getAllfavs();
      },
  
    })
    }
  //////////////////////////////////////////////////////////////////////////
  /************ for search part  */
  getAllTags(){
    this.ReceipeService.getAllTags().subscribe({
      
      next:(res)=>{
           console.log(res);
           this.listOfTags= res
          
      },
      error:()=>{

      },
      complete:()=>{

      }
    });
}

getAllCategories(){
  this._CategoryService.getAllCategoriesForReceipes(1,10000).subscribe({
    
    next:(res)=>{
         console.log(res);
         console.log("hello from category")
         this.listOfCategories= res.data
        
    },
    error:()=>{

    },
    complete:()=>{

    }
  });
}


/////////////////////////////////////////////////////////////////////////


 

 //////////////////////////////////////////////////////////////////////
 //pagination 
 pageChangeEvent(event: PageEvent) {
  this.pageNumber = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getAllfavs();
}
resetSearcgInput(){
  this.SearchValue= '';
  this.getAllfavs();
}
showcard(){
   this.showcards = true ;
 }
 showTable(){
  this.showcards= false
 }
 ////view dialog 
 openViewDialog(userdata:any):void {
  const dialogRef = this.dialog.open(ViewFavReceipeComponent, {
    data:userdata,
  });
}
addToFav(favID:any){
  console.log("fav") ;
  this._FavoritesService.addtofav(favID).subscribe({
    next:()=>{
      this.toastr.success("Receipe has been added to Favorites ")
    }
  });

}
daletefromfave(id:any){
this._FavoritesService.deletefav(id).subscribe({
  next:()=>{
    console.log("deleted");
    this.getAllfavs()
  }
});
}
}