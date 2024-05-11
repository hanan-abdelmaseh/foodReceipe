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

  image !:any;
  data: { [key: string]: any } = {
    name: "",
    description: "",
    price: null,
    tagId: null,
    categoriesIds: [],
    recipeImage: null,
  }

  /////
  ReceipeForm!: FormGroup; 

  /////
 

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
    this.ReceipeForm = new FormGroup({
      name: new FormControl(this.data['name']),
      description: new FormControl(this.data['description']),
      price: new FormControl(this.data['price']),
      tagId: new FormControl(this.data['tagId']),
      recipeImage: new FormControl(this.data['recipeImage']),
      categoriesIds: new FormControl(this.data['categoriesIds'])
  
      //// 
    });


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
      
       this.fetchImge(this.ImgStaticPath+this.newreceipeData.imagePath);
   console.log(this.ImgStaticPath+this.newreceipeData.imagePath)
      this.ReceipeForm.patchValue({
        name: this.newreceipeData.name,
        description: this.newreceipeData.description,
        price: this.newreceipeData.price,
        tagId: this.newreceipeData.tag.id,
        recipeImage: this.newreceipeData.imagePath,
        categoriesIds: this.selectedcatID

      });
        console.log(this.ReceipeForm);
       
      }

    });
  }

  sendData(receipeinfo: FormGroup) {
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
    // we will use formdata as we want to upload image 
    let data = new FormData();

    for (let key in this.ReceipeForm.value) {
      if (key === "recipeImage") continue;
      data.append(key, this.ReceipeForm.value[key]);
    }

    if (this.imgSrc) data.append("recipeImage", this.imgSrc);

    if (this.receipeId) {
      // -update  
      this.updateReceipe(this.receipeId, data);
    }
    else {
      /// add new recipe 
      this.addNewRecipe(data);
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
    this.image = this.files[0];
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

    async fetchImge(url:string){
var res =await fetch(url) ;
var blob = await res.blob() ;
this.image = blob;
   }
}


