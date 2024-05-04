import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  dumyImage:string="../../../../../assets/images/profileDumy.jpg";
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  constructor(
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private _AuthService: AuthService , private _Router:Router ,
    private toastr: ToastrService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  imgSrc :any;
  updatingProfileForm = new FormGroup({
    userName: new FormControl('' , Validators.required),
    email: new FormControl('',[Validators.required , Validators.email]),
    country: new FormControl('' , Validators.required),
    phoneNumber: new FormControl('' , Validators.required),
    profileImage: new FormControl(''),
    confirmPassword: new FormControl( '', [Validators.required , 
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/) ]),

  });
   // to control eye of password
   isShown:boolean = true;
   isconfirm:boolean= true
  files: File[] = [];


  
  ngOnInit() {

  }
  updatingProfileData(userinfo: FormGroup) {
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
    // we will use formdata as we want to upload image 

    let newUSerData = new FormData();

    newUSerData.append('userName', userinfo.value.userName);
    newUSerData.append('email', userinfo.value.email);
    newUSerData.append('country', userinfo.value.country);
    newUSerData.append('phoneNumber', userinfo.value.phoneNumber);
    newUSerData.append('profileImage', this.imgSrc);
    newUSerData.append('confirmPassword', userinfo.value.confirmPassword);

    console.log(newUSerData);
//in service if i make data:iregister here in component refuse it ?

    this._AuthService.updatingProfile(newUSerData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('your Profile has been updated')
      },
      error:()=>{

      },
      complete:()=>{
        this.onNoClick()
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
