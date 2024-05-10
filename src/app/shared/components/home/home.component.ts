import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  userName :string|null ="" ;
  constructor(private _AuthService:AuthService){

  }
  ngOnInit() {
    this.getUsername();
}

  getUsername(){
    this.userName = localStorage.getItem("userName");
    console.log(this.userName);
   }

   //check the role 
   isAdmin():boolean{
    return this._AuthService.role == 'SuperAdmin'? true:false
  }
  isUser():boolean{
    return this._AuthService.role == 'SystemUser'? true:false
  }
}
