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
  tagID: any;
  CategoryID: any;
  listOfTags: any[] = [];
  listOfCategories: any[] = [];
  ImgStaticPath: string = "https://upskilling-egypt.com:3006/"

  imgSrc: any;
  receipeId: number = 0;
  selectedcatID:number[]=[] ;

  /////
  ReceipeForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    tagId: new FormControl(''),
    recipeImage: new FormControl(''),
    categoriesIds: new FormControl()

    //// 
  });

  //receipe data 
  newreceipeData: any;
  constructor(private _RecepiesService: RecepiesService, private _Router: Router,
    private _CategoryService: CategoryService,
    private toastr: ToastrService, private _ActivatedRoute: ActivatedRoute
  ) {
     //to get id of the selected item needed to be updated
     this.receipeId = this._ActivatedRoute.snapshot.params['id'];
     console.log(this.receipeId);
 
     if (this.receipeId) {
       //edit 
       this.getRecipeById(this.receipeId);
 
     }
     else {
       //add
       //this.AddReceipe()
     }

  }


  ngOnInit() {
   

    this.getAllTags();
    this.getAllCategories();
  }

  getRecipeById(id: number) {
    this._RecepiesService.getReceipeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.newreceipeData = res;
      },
      error: () => {
      },
      complete: () => {
      for(let i=0 ; i<this.newreceipeData.category.length ; i++){
       this.selectedcatID.push(this.newreceipeData.category[i].id);
      }
      console.log(this.selectedcatID)
        this.ReceipeForm.patchValue({
          name:this.newreceipeData.name ,
          description:this.newreceipeData.description,
          price:this.newreceipeData.price,
          tagId: this.newreceipeData.tag.id,
          recipeImage:this.newreceipeData.imagePath,
          categoriesIds:this.selectedcatID
 
        });
        console.log(this.ReceipeForm);
       
      }

    });
  }

  sendData(receipeinfo: FormGroup) {
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
    // we will use formdata as we want to upload image 
    console.log(receipeinfo.value)
    if(this.receipeId){
      // -update  
       this.updateReceipe( this.receipeId ,receipeinfo.value);
    }
    else{
/// add new recipe 
       this.addNewRecipe(receipeinfo.value);
    }

  }

  addNewRecipe(receipeData: any){
    this._RecepiesService.AddRecipe(receipeData).subscribe( {
      next: (res) => {
      console.log(res)
    }, error: () => {

    }, complete: () => {
      this.toastr.success("item has been added");
    }
    });
  }
  //updating receipe
  updateReceipe( id:number , receipeData: FormData ) {
    this._RecepiesService.updateRecipe(id , receipeData).subscribe({
      next: (res) => {
        console.log(res)
      }, error: () => {

      }, complete: () => {
        this.toastr.success("item has been updated");
      }
    });
  }


  /// 
  getAllTags() {
    this._RecepiesService.getAllTags().subscribe({

      next: (res) => {
        console.log(res);
        this.listOfTags = res

      },
      error: () => {

      },
      complete: () => {

      }
    });
  }
  getAllCategories() {
    this._CategoryService.getAllCategoriesForReceipes(1, 10000).subscribe({

      next: (res) => {
        console.log(res);
        console.log("hello from category")
        this.listOfCategories = res.data

      },
      error: () => {

      },
      complete: () => {

      }
    });
  }
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


}


