import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  userName :string|null ="" ;
  ngOnInit() {
    this.getUsername();
}

  getUsername(){
    this.userName = localStorage.getItem("userName");
    console.log(this.userName);
   }
}
