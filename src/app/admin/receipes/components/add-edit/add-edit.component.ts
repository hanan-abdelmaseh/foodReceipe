import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecepiesService } from '../../services/Recepies.service';
import { ITag } from '../../interfaces/model';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCategoriesComponent } from 'src/app/admin/categories/components/add-edit-categories/add-edit-categories.component';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class ADDEDITComponent implements OnInit {
  files: File[] = [];
  tagID:any;
  CategoryID:any;
  listOfTags:any[]=[] ;
  listOfCategories:any[]=[];
  ImgStaticPath:string ="https://upskilling-egypt.com:3006/"

  imgSrc :any;
  AddReceipeForm = new FormGroup({
    name: new FormControl('' , Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('' , Validators.required),
    tagId: new FormControl(''),
    recipeImage:new FormControl('' , Validators.required),
    categoriesId:new FormControl('', Validators.required)
   
  

  });
   constructor(private _RecepiesService:RecepiesService, private _Router:Router , 
    private _CategoryService:CategoryService,
    private toastr: ToastrService 
  ) {}


    ngOnInit() {
     
      this.getAllTags();
      this.getAllCategories();
      
   
      
      }
  AddReceipe(receipeinfo: FormGroup) {
      //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
      // we will use formdata as we want to upload image 
  
      let REceipeData = new FormData();
  
      REceipeData.append('name', receipeinfo.value.name);
      REceipeData.append('description', receipeinfo.value.description);
      REceipeData.append('price', receipeinfo.value.price);
      REceipeData.append('tagId',this.tagID);
      REceipeData.append('recipeImage', this.ImgStaticPath+this.imgSrc);
      REceipeData.append('categoriesIds', this.CategoryID);

      
     
  
      console.log(REceipeData);
  //in service if i make data:iregister here in component refuse it ?
  
      this._RecepiesService.AddRecipe(REceipeData).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('your Receipe has been added ')
        },
        error:()=>{
  
        },
        complete:()=>{
          this._Router.navigateByUrl('dashboard/admin/receipes/all')
        }
      });
  
    }

    getAllTags(){
      this._RecepiesService.getAllTags().subscribe({
        
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
    onSelect(event:any) {
      console.log(event);
      this.files.push(...event.addedFiles);
      this.imgSrc = this.files[0];
    }
    
    onRemove(event:any) {
      console.log(event);
      this.files.splice(this.files.indexOf(event), 1);
    }
   
  }
 

