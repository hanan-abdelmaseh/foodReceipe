import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { RecepiesService } from '../../services/Recepies.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';

@Component({
  selector: 'app-edit-receip',
  templateUrl: './edit-receip.component.html',
  styleUrls: ['./edit-receip.component.scss']
})
export class EditReceipComponent {
  files: File[] = [];
  tagID:any;
  CategoryID:any;
  listOfTags:any[]=[] ;
  listOfCategories:any[]=[];
  ImgStaticPath:string ="https://upskilling-egypt.com:3006/"

  imgSrc :any;
  AddReceipeForm = new FormGroup({
    id:new FormControl([{ value: '', disabled: true }, Validators.required]),
    name: new FormControl('' , Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('' , Validators.required),
    tagId: new FormControl(''),
    recipeImage:new FormControl('' , Validators.required),
    categoriesId:new FormControl('', Validators.required)
   
  

  });
   constructor(private _RecepiesService:RecepiesService, private _Router:Router , 
    private _CategoryService:CategoryService,
    private toastr: ToastrService , public dialogRef: MatDialogRef<EditReceipComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



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
      REceipeData.append('recipeImage',this.imgSrc);
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

    updateReceipe(receipeData:FormGroup){
      let newREceipeData = new FormData();
      newREceipeData.append('id' ,receipeData.value.id);
      newREceipeData.append('name', receipeData.value.name);
      newREceipeData.append('description', receipeData.value.description);
      newREceipeData.append('price', receipeData.value.price);
      newREceipeData.append('tagId',this.tagID);
      newREceipeData.append('recipeImage',this.ImgStaticPath+this.imgSrc);
      newREceipeData.append('categoriesIds', this.CategoryID);

      
     
  
      console.log(newREceipeData);
      this._RecepiesService.updateRecipe(newREceipeData.get('id'),newREceipeData).subscribe({
        next:(res)=>{
          console.log(res)
        }, error:()=>{
          
        }, complete:()=>{
          this.toastr.success("item has been updated") ;
          this.onNoClick() ;
          
        
        }
      });
    }
}
