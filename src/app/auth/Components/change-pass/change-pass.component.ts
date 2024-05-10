import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent  implements OnInit{
  changePAsswordForm:FormGroup = new FormGroup({
    oldPassword: new FormControl('' , [Validators.required ]) ,
    newPassword: new FormControl('' , [Validators.required  , 
       Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)]) ,
    confirmNewPassword: new FormControl('' , [Validators.required ,
       Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)]) 
   
  });
  constructor(private _AuthService:AuthService ,
     private _router:Router , private toastr: ToastrService){}
      // to control eye of password
   isShown:boolean = false;
   isconfirm:boolean= false;
   ispass:boolean=false
  ngOnInit(){
   
  }
 
  changePass( userData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}

   this._AuthService.changePAssword(userData.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('your password has been changed sucessfully :)');
    
  },
  error:(err)=>{
    this.toastr.error(err.error.additionalInfo.errors.confirmNewPassword[0])
    console.log(err.error.additionalInfo.errors.confirmNewPassword[0]

    )

  }
  ,complete:()=>{
    this._router.navigateByUrl('/dashboard/home')
  }
   });    
  }
}
