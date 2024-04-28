import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent  implements OnInit{

  resetPAsswordForm:FormGroup = new FormGroup({
    email: new FormControl( '' , [Validators.required , Validators.email]) ,
    password:new FormControl('' ,  [Validators.required ,
                                    Validators.pattern('/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%*?&])[A-Za-z\d@$!%*&]{8,}$')]),
    confirmPassword:new FormControl(null),
    seed:new FormControl('' , Validators.required)
                                     
  });

  constructor(private _AuthService:AuthService , private toastr: ToastrService){}
  ngOnInit(): void {
   
  }
  resetYourPassword( userData:FormGroup){
    //email:"hananabdelmaseh9@gmail.com" , password:"Hanan1$$"}

   this._AuthService.resetPassword(userData.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastr.success('Your Password has been updated');
  }
   });    
  }

}
