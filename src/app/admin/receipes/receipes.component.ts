import { Component, OnInit } from '@angular/core';
import { RecepiesService } from './services/Recepies.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewComponent } from 'src/app/shared/components/view/view.component';
import { AddEditCategoriesComponent } from '../categories/components/add-edit-categories/add-edit-categories.component';

import { FormControl } from '@angular/forms';
import { ICategory, ITag } from './interfaces/model';
import { CategoryService } from '../categories/services/category.service';
import { Router } from '@angular/router';
import { ViewReceipeComponent } from './components/view-receipe/view-receipe.component';
import { ADDEDITComponent } from './components/add-edit/add-edit.component';


@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.scss']
})
export class ReceipesComponent  implements OnInit{
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
  validData:boolean = false;
  listOfTags:ITag[]=[] ;
  listOfCategories:any[]=[];

  showcards:boolean = false;
  //

  

  constructor(private  ReceipeService:RecepiesService , 
    private _CategoryService:CategoryService , public dialog: MatDialog ,  private _router:Router ,
      private toastr: ToastrService){}
  
  ngOnInit() {
  this.getAllReceipes();
  this.getAllTags();
this.getAllCategories()
  
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
             this.validData= true;
             console.log(this.listOfReceipes);
            
            
        },
        error:()=>{

        },
        complete:()=>{

        }
      });
  }
   //dialog  for updting
 
getReceipeById(id:any){
  this.ReceipeService.getReceipeById(id).subscribe({
    next:(
      res
    )=>{console.log(res)},
    error:()=>{

    },
    complete:()=>{

    }
  })
}
  /////////update 

  // updateReceipe(receipeData:any){
  //   this.ReceipeService.updateRecipe(receipeData).subscribe({
  //     next:(res)=>{
  //       console.log(res)
  //     }, error:()=>{
        
  //     }, complete:()=>{
  //       // to load data again after adding new category
  //       this.getAllReceipes();
  //     }
  //   });
  // }
  
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
openViewDialog(receipeDate:any) {
  const dialogRef = this.dialog.open(ViewReceipeComponent, {
    data: receipeDate
  });
  dialogRef.afterClosed().subscribe(result => {
 
     console.log( result);
    
    

  });
}
 



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

}
