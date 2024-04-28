import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/Services/auth.service';

interface IMenu {
   text:string ,
   icon:string ,
   link:string,
   isActive:boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})



export class SidebarComponent {
  constructor(private _AuthService:AuthService){}
  // at first we need to check the role 
  isAdmin():boolean{
    return this._AuthService.role == 'SuperAdmin'? true:false
  }
  isUser():boolean{
    return this._AuthService.role == 'SystemUser'? true:false
  }
  // then use role in menu conditions 
   menu:IMenu[] = [
    {
      text:'Home',
      icon:'fa fa-home' ,
      link:'/dashboard/home',
      isActive:this.isAdmin() || this.isUser()
    },
    {
      text:'Users',
      icon:'fa fa-users' ,
      link:'/dashboard/admin/users',
      isActive:this.isAdmin()
    },
    {
      text:'Receipes',
      icon:'fa fa-object-group' ,
      link:'/dashboard/admin/receipes',
      isActive:this.isAdmin()
    },
    {
      text:'Categories',
      icon:'fa fa-calendar' ,
      link:'/dashboard/admin/categories',
      isActive:this.isAdmin()
    },
    {
      text:'Favorites',
      icon:'fa fa-heart' ,
      link:'',
      isActive:this.isUser()
    },
    {
      text:'User Receipes',
      icon:'fa fa-heart' ,
      link:'',
      isActive:this.isUser()
    },

   ]
}
