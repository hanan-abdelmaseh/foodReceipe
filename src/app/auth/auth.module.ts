import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './Components/register/register.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { VerifyComponent } from './Components/verify/verify.component';
import { ChangePassComponent } from './Components/change-pass/change-pass.component';


@NgModule({
  
  declarations: [
    AuthComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyComponent,
    ChangePassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule , 
    ReactiveFormsModule ,
    SharedModule
  ] , 
  exports:[
    ChangePassComponent
  ]
})
export class AuthModule { }
