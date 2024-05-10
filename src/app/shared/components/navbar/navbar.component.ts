import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName:string |null ="" ;
  userImag:string|null ="" ;
  apiImagePath:string = 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../../../assets/images/profileDumy.jpg";
  mainImag:string ='';
    userData:any ;
  constructor(public dialog: MatDialog , private _AuthService:AuthService ,private _Router:Router){}
  ngOnInit() {
      this.getUser();
  }
  openDialog() {
    this.dialog.open(LogoutComponent);
  }  

  getUser(){


 
   this._AuthService.getCurrentuser().subscribe({
    next:(res)=>{
      this.userData= res
      console.log(this.userData);
      console.log(this.userData.imagePath
      )
      console.log(this.apiImagePath+this.userData.imagePath)
    }
   })




  }
 


  gotoProfile(){
    this._Router.navigateByUrl('/dashboard/profile')
  }
  goToChangePAss(){
    this._Router.navigateByUrl('/dashboard/changePAssword')
  }
  ///////////profile handling 

  
 
}
