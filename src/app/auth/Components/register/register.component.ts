import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRegister } from '../../Interfaces/register';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  imgSrc :any;
  registerForm = new FormGroup({
    userName: new FormControl('' , Validators.required),
    email: new FormControl('',[Validators.required , Validators.email]),
    country: new FormControl('' , Validators.required),
    phoneNumber: new FormControl('' , Validators.required),
    profileImage: new FormControl(''),
    password: new FormControl( '', [Validators.required , 
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/) ]),
    confirmPassword: new FormControl( '', [Validators.required , 
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/) ]),

  });
   // to control eye of password
   isShown:boolean = true;
   isconfirm:boolean= true
  files: File[] = [];


  constructor(private _AuthService: AuthService , private _Router:Router ,
     private toastr: ToastrService
  ) { }
  ngOnInit() {

  }
  userRegister(userinfo: FormGroup) {
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}
    // we will use formdata as we want to upload image 

    let newUSerData = new FormData();

    newUSerData.append('userName', userinfo.value.userName);
    newUSerData.append('email', userinfo.value.email);
    newUSerData.append('country', userinfo.value.country);
    newUSerData.append('phoneNumber', userinfo.value.phoneNumber);
    newUSerData.append('profileImage', this.imgSrc);
    newUSerData.append('password', userinfo.value.password);
    newUSerData.append('confirmPassword', userinfo.value.confirmPassword);

    console.log(newUSerData);
//in service if i make data:iregister here in component refuse it ?

    this._AuthService.register(newUSerData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:()=>{

      },
      complete:()=>{
        this._Router.navigate(['/auth/verify']);
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


  navigateToLogin(){
    this._Router.navigateByUrl('auth')
    }

    navigateToverify(){
      this._Router.navigateByUrl('auth/verify')
    }
}
