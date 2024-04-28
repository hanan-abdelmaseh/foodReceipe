import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Components/register/register.component';
import { VerifyComponent } from './Components/verify/verify.component';

const routes: Routes = [
  //routing will be handled after finishing components

  { path: '', component: AuthComponent },
  { path: 'forgetPass', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
