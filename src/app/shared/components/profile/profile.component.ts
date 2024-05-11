import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dumyImage:string="../../../../../assets/images/profileDumy.jpg";
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  imgSrc :any;
  files: File[] = [];
  image !:any;
  data: { [key: string]: any } = {
    userName: "",
    email: "",
    country: null,
    phoneNumber: null,
    profileImage: [],
    confirmPassword: null,
  }


  
  updatingProfileForm!: FormGroup; 
  constructor(private _AuthService:AuthService ,
    private _router:Router , private toastr: ToastrService){}
  ngOnInit(): void {
   this.updatingProfileForm  = new FormGroup({
      userName: new FormControl(this.data['userName']) ,
      email: new FormControl(this.data['email']) ,
      country: new FormControl(this.data['country']) ,
      phoneNumber: new FormControl(this.data['phoneNumber']) ,
      profileImage:new FormControl(this.data['profileImage']),
      confirmPassword: new FormControl(this.data['confirmPassword']) ,
  
     
    });
   this.getCurrentUser() ;
 
  }

  setUpdatingProfileFormValues(){
    
    this.updatingProfileForm.patchValue({
      userName:  this.currentUSer.userName,
      email:  this.currentUSer.email ,
      country:   this.currentUSer.country,
      phoneNumber:   this.currentUSer.phoneNumber,
      profileImage:  this.currentUSer.imagePath ,
      confirmPassword:  this.currentUSer.confirmPassword ,
     })
  }
  currentUSer:any;
  getCurrentUser(){
   this._AuthService.getCurrentuser().subscribe({
        next:(res)=>{
    this.currentUSer = res;
    this.fetchImge(this.imgURL+this.currentUSer.imagePath);

   
    console.log(this.imgURL+this.currentUSer.imagePath)
    this.setUpdatingProfileFormValues()
    console.log(this.currentUSer)
        },
        error:()=>{

        },complete:()=>{

        }
   })
  }

 

  updatingProfile( userProfileData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
    let newProfileData = new FormData();

    newProfileData.append('userName', userProfileData.value.userName);
    newProfileData.append('email', userProfileData.value.email);
    newProfileData.append('country', userProfileData.value.country);
    newProfileData.append('phoneNumber', userProfileData.value.phoneNumber);
    newProfileData.append('profileImage', this.image);
   
    
    newProfileData.append('confirmPassword', userProfileData.value.confirmPassword);

    console.log(newProfileData);


   this._AuthService.updatingProfile(newProfileData).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('Your Profile Has been Updated ');
  
  } , error:(error)=>{
    this.toastr.error("please Check Your Data Carefully :)"
          );
  },
  complete:()=>{
   
  }

   });    
  }
  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.image = this.files[0];
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async fetchImge(url:string){
    var res =await fetch(url) ;
    var blob = await res.blob() ;
    this.image = blob;
       }
}
