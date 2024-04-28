import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm:FormGroup = new FormGroup({
    email: new FormControl( '', [Validators.required , 
                                    Validators.email ,
                                    Validators.minLength(8) ,
                                    Validators.maxLength(100)]) ,
    password:new FormControl('', [Validators.required , 
      //Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/) 
                                     ])
  });
  // to control eye of password
  isShown:boolean = true;

  constructor(private _AuthService:AuthService ,   
    private _router:Router , private toastr: ToastrService){}
  ngOnInit() {
    
  }
  
  userLogin( userData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hana1%%"}

   this._AuthService.login(userData.value).subscribe({
  next:(res)=>{
    console.log(res);
   
   this.toastr.success('Welcome , You are logged in');
    // 1- save token in local storage >> then we will use it in auth gaurd
   localStorage.setItem("userToken" ,res.token) ;
   //call getprofile which decode token
   this._AuthService.getProfile();
   // handle navigate to dashboard

  }  , error:()=>{

  } ,
  complete:()=> {
    this._router.navigate(['dashboard']);
  }
   });    
  }


  navigateToForgetPassword(){
    this._router.navigateByUrl('auth/forgetPass')
    }
    navigateToRegister(){
      this._router.navigateByUrl('auth/register')
      }

}
