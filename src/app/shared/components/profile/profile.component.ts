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

  updatingProfileForm :FormGroup = new FormGroup({
    userName: new FormControl('',) ,
    email: new FormControl('',) ,
    country: new FormControl('',) ,
    phoneNumber: new FormControl('',) ,
    profileImage: new FormControl('',) ,
    confirmPassword: new FormControl('',) ,

   
  });

  constructor(private _AuthService:AuthService ,
    private _router:Router , private toastr: ToastrService){}
  ngOnInit(): void {
   this.getCurrentUser()
  }
  currentUSer:any;
  getCurrentUser(){
   this._AuthService.getCurrentuser().subscribe({
        next:(res)=>{
    this.currentUSer = res;
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
    newProfileData.append('profileImage', this.imgSrc);
   
    
    newProfileData.append('confirmPassword', userProfileData.value.confirmPassword);

    console.log(newProfileData);


   this._AuthService.updatingProfile(newProfileData).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('Your Profile Has been Updated ');
  
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
