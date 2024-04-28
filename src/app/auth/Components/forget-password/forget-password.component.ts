import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  
  forgetPAsswordForm:FormGroup = new FormGroup({
    email: new FormControl('' , [Validators.required , Validators.email]) 
   
  });
  constructor(private _AuthService:AuthService ,
     private _router:Router , private toastr: ToastrService){}
  ngOnInit(){
   
  }
 
  forgetPass( userData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}

   this._AuthService.forgetPassword(userData.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('Please Check Your Email');
    this.navigateToresetPassword();
  }
   });    
  }

  navigateToresetPassword(){
  this._router.navigateByUrl('auth/resetPassword')
  }
}
