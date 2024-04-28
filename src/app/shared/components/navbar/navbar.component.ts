import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName :string|null ="" ;
  ngOnInit() {
      this.getUsername();
  }

  getUsername(){
   this.userName = localStorage.getItem("userName");
   console.log(this.userName);
  }

}
