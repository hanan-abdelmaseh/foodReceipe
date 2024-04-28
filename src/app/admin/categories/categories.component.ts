import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoriesComponent } from './components/add-edit-categories/add-edit-categories.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { ViewComponent } from 'src/app/shared/components/view/view.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  implements OnInit{
  pageNumber:number = 1;
  pageSize:number=10;
  listOfCAtegories :any ;
  //dialog 
  categoryItem: string= '' ;



  constructor(private _CategoryService:CategoryService , public dialog: MatDialog ,
      private toastr: ToastrService){}
  
  ngOnInit() {
  this.getAllCategories();
  
  }

  getAllCategories(){
      this._CategoryService.getAllCategories(this.pageNumber,this.pageSize).subscribe({
        //we need to pass token in header of interceptors to be able to see categories
        next:(res)=>{
             console.log(res);
             this.listOfCAtegories= res;
             console.log(this.listOfCAtegories);
             this.pageNumber =this.listOfCAtegories.pageNumber ;
             this.pageSize= this.listOfCAtegories.pageSize;

        },
        error:()=>{

        },
        complete:()=>{

        }
      });
  }
  //dialog  for add new catalog
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoriesComponent, {
      data: {name: this.categoryItem},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       console.log( result);
      
       //check result 
       if(result){
        this.addNewCAtegory(result);
        this.toastr.success('your category Has been added');

       }
    });
  }

  addNewCAtegory(categoryName:string){
    this._CategoryService.AddCategory(categoryName).subscribe({
      next:(res)=>{
        console.log(res)
      }, error:()=>{
        
      }, complete:()=>{
        // to load data again after adding new category
        this.getAllCategories();
      }
    });
  }

  //delete category 
  openDeleteDialog(deltedId:number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id:deltedId},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete  was closed');
       console.log( result);
       //check result 
        this.deleteCategorybyID(result)
         this.toastr.success('your category deleted');

    });
  }
  deleteCategorybyID(id:number){
  this._CategoryService.deletecategory(id).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:()=>{},
    complete:()=>{
      this.getAllCategories();
    },

  })
  }


  //get by id
  //view category 
  openViewDialog(viewId:number):void {
    const dialogRef = this.dialog.open(ViewComponent, {
      data: {id:viewId},
    });
   
    /*
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete  was viewed');
       console.log( result);
       //check result 
        this.getCategoryByID(result)
         this.toastr.success('your category viewed sucessfully');

    });
    */
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



  /////////update 
  openUpdateDialog(updateID:number): void {
    const dialogRef = this.dialog.open(AddEditCategoriesComponent, {
      data: {id:updateID ,name: this.categoryItem},
    });

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
   currentPAge:number=0
  //pagination 
  getPAgination(pageEvent:any){
    if(this.listOfCAtegories.pageNumber !== pageEvent.page)
      {
        this.listOfCAtegories.pageNumber = pageEvent.page;
        this.getAllCategories();
        console.log("hello")
      }
  }

}