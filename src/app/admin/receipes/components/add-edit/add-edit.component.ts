import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecepiesService } from '../../services/Recepies.service';
import { ITag } from '../../interfaces/model';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { ActivatedRoute } from '@angular/router';
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
  receipeId:number=0;

  AddReceipeForm = new FormGroup({
    name: new FormControl('' , Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('' , Validators.required),
    tagId: new FormControl(''),
    recipeImage:new FormControl('' , Validators.required),
    categoriesId:new FormControl('', Validators.required)
   
  //// 


  });

  //receipe data 
  newreceipeData:any ;
   constructor(private _RecepiesService:RecepiesService, private _Router:Router , 
    private _CategoryService:CategoryService,
    private toastr: ToastrService  , private _ActivatedRoute:ActivatedRoute
  ) {
  //to get id of the selected item needed to be updated
  this.receipeId=this._ActivatedRoute.snapshot.params['id'];
  console.log(this.receipeId);

  }


    ngOnInit() {
    
      this.getAllTags();
      this.getAllCategories();
     

       if(this.receipeId){
        //edit 
        this.getRecipeById(this.receipeId);

  }
  else{
    //add
     //this.AddReceipe()
  }
   
      
      }
      
  sendData(receipeinfo: FormGroup) {
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
    if(this.receipeId){
   this.updateReceipe(REceipeData);
    }
    else{
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
     
  
    }

   getRecipeById(id:number){
    this._RecepiesService.getReceipeById(id).subscribe({
      next: (res) => {
        console.log(res);
       this.newreceipeData=res ;
      },
      error:()=>{

      },
      complete:()=>{

        /*this.AddReceipeForm.patchValue({
          name:this.newreceipeData.name ,
          description:this.newreceipeData.description,
          price:this.newreceipeData.price,
          tagId: this.newreceipeData.tag.id,
          recipeImage:this.newreceipeData.recipeImage,
          categoriesId:this.newreceipeData.category[0].id

        })
       */
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

    //updating receipe 

    updateReceipe(receipeData:any){
      this._RecepiesService.updateRecipe(receipeData.value).subscribe({
        next:(res)=>{
          console.log(res)
        }, error:()=>{
          
        }, complete:()=>{
          this.toastr.success("item has been updated") ;
         
          
        
        }
      });
    }


    /// 

  
   
  }
 

