import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { ITag } from 'src/app/admin/receipes/interfaces/model';
import { RecepiesService } from 'src/app/admin/receipes/services/Recepies.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewUserREceipeComponent } from './components/view-user-receipe/view-user-receipe.component';
import { FavoritesService } from '../favorites/services/favorites.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.scss']
})
export class ReceipesComponent {
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
showRecipes:boolean =false ;
  listOfTags:ITag[]=[] ;
  listOfCategories:any[]=[];
  

  constructor(private  ReceipeService:RecepiesService , private spinner: NgxSpinnerService,
    private _CategoryService:CategoryService , public dialog: MatDialog ,  private _router:Router ,
      private toastr: ToastrService , private _FavoritesService:FavoritesService){}
  
  ngOnInit() {
  this.getAllReceipes();
  this.getAllTags();
this.getAllCategories();
this.spinner.show();
 
setTimeout(() => {
  /** spinner ends after 5 seconds */
  this.showRecipes=true;
  this.spinner.hide();
}, 2000);
  
  }

getAllReceipes(){
  //to applay search 
  let params={
    name:this.SearchValue ,
    tagId:this.tagId,
    categoryId:this.CategoryID,
    pageSize:this.pageSize,
    pageNumber:this.pageNumber
  }
      this.ReceipeService.getAllReceipes(params).subscribe({
        //we need to pass token in header of interceptors to be able to see receipes
        next:(res)=>{
             console.log(res);
             this.listOfReceipes= res;
        
             console.log(this.listOfReceipes);
            
            
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
        this.getAllReceipes();
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
  this.getAllReceipes();
}
resetSearcgInput(){
  this.SearchValue= '';
  this.getAllReceipes();
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

}
