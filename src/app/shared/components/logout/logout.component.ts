import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _Router:Router ,  private toastr: ToastrService){}
  ngOnInit(): void {

  } 
  userToken ='' ;
  logout(){
  
   console.log( localStorage.getItem('userToken'));
    localStorage.removeItem('userToken');
    this._Router.navigateByUrl('auth');
    this.toastr.success('You have logged out , Please login again');



  }
  
}


