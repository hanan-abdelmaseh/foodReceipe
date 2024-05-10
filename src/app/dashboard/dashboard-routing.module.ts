import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../core/Guards/admin.guard';
import { userGuard } from '../core/Guards/user.guard';
import { HomeComponent } from '../shared/components/home/home.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { ChangePassComponent } from '../auth/Components/change-pass/change-pass.component';

const routes: Routes = [{ path: '', component: DashboardComponent  , children:[
  {
    path:'' , redirectTo:'/dashboard/home' , pathMatch:"full"
  } ,
  {path:'home' , component:HomeComponent},
  {path:'profile' , component:ProfileComponent},
  {path:'changePAssword' , component:ChangePassComponent},

  { path: 'user',canActivate:[userGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
  { path: 'admin',canActivate:[adminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
