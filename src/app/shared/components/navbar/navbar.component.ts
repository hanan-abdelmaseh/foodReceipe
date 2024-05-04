import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from 'src/app/auth/Services/auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

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
  constructor(public dialog: MatDialog , private _AuthService:AuthService){}
  ngOnInit() {
      this.getUser();
  }
  openDialog() {
    this.dialog.open(LogoutComponent);
  }  

  getUser(){
    /*
   this.userName = localStorage.getItem("userName");
   this.userImag =localStorage.getItem('userImage');

   console.log(this.userName);
   console.log(this.userImag);
   //to check image 
   if(this.userImag === 'null'){
    this.mainImag=this.dumyImage;
    console.log(this.mainImag);
   }
*/
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
  goToProfile(){

  }




  ///////////profile handling 

   /////////update 
   openProfileDialog(currentUserData:any): void {
    const dialogRef = this.dialog.open(ProfileComponent, {

      data: currentUserData,
    });
    //need to handle name ?
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       console.log( result);
       //check result 
       if(result){
        this.updateProfile(result);
        //this.toastr.success('your category Has been updated');
       }
    });
  }
  updateProfile(currentUserData:any):void{
    const dialogRef = this.dialog.open(UpdateProfileComponent, {

      data: currentUserData,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       console.log( result);
       //check result 
       if(result){
        //this.updateProfile(result);
        //this.toastr.success('your category Has been updated');
       }
    });
  }
  updateCategory(id:number ,categoryName:string){
   /* this._AuthService.u(id,categoryName).subscribe({
      next:(res)=>{
        console.log(res)
      }, error:()=>{
        
      }, complete:()=>{
        // to load data again after adding new category
        this.getAllCategories();
      }
     
    });
     */
  }
}
