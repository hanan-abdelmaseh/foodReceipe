import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  verifyForm:FormGroup = new FormGroup({
    email: new FormControl( '' , [Validators.required , Validators.email]) ,
    code:new FormControl('' , Validators.required)
                                     
  });
  constructor(private _AuthService:AuthService , private toastr: ToastrService ,private _Router:Router){}
  ngOnInit(): void {
   
  }
  verify( userData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}

   this._AuthService.verifyAccount(userData.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('Your account has been activated');
   
  } ,
 error:()=>{

} ,
complete:()=> {
 this._Router.navigate(['']);
}

   });    
  }

}
