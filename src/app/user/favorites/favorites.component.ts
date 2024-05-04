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

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  pageNumber:number = 1;
  pageSize:number=10;
  listOfReceipes :any ;
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
  

  constructor(private  ReceipeService:RecepiesService , 
    private _CategoryService:CategoryService , public dialog: MatDialog ,  private _router:Router ,
      private toastr: ToastrService , private _FavoritesService:FavoritesService){}
  
  ngOnInit() {
  this.getAllfavs();
  this.getAllTags();
this.getAllCategories()
  
  }

getAllfavs(){
  
      this._FavoritesService.getAllfavorites().subscribe({
        //we need to pass token in header of interceptors to be able to see receipes
        next:(res)=>{
             console.log(res);
             this.listOfFav= res;
        
             console.log(this.listOfFav);
             
            
            
        },
        error:()=>{

        },
        complete:()=>{

        }
      });
  }
   //dialog  for add new category
 
  
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

  /*
 
 

  //get by id
  //view category  not completetd
  openViewDialog(viewId:number , Categoryname:string , creation:string , updating:string):void {
    const dialogRef = this.dialog.open(ViewComponent, {
      data: {id:viewId , name:Categoryname , creationDate:creation ,updatingDate:updating},
    });
  }
  getCategoryByID(id:number){
    this._CategoryService.getCategoryById(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:()=>{},
      complete:()=>{
        //this.getAllCategories();
      },
  
    })
     
  }

/////////////////////////////////////////////////////////////////////////

  /////////update 
  openUpdateDialog(updateID:number ,updatedValue:string ): void {
    const dialogRef = this.dialog.open(AddEditCategoriesComponent, {

      data: {id:updateID ,name: updatedValue } ,
    });
    //need to handle name ?
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       console.log( result);
       //check result 
       if(result){
        this.updateCategory(updateID ,result);
        this.toastr.success('your category Has been updated');
       }
    });
  }
  updateCategory(id:number ,categoryName:string){
    this._CategoryService.updateCetegory(id,categoryName).subscribe({
      next:(res)=>{
        console.log(res)
      }, error:()=>{
        
      }, complete:()=>{
        // to load data again after adding new category
        this.getAllCategories();
      }
    });
  }
 
//sort data 


*/
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
  const dialogRef = this.dialog.open(ViewUserREceipeComponent, {
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