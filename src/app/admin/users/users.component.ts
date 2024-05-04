import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

import { ITag } from '../receipes/interfaces/model';

import { UsersService } from './Services/Users.service';
import { ViewUserComponent } from './components/view-user/view-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  pageNumber:number = 1;
  pageSize:number=10;
  listOfUsers :any  ;
  loaded:boolean = false;
  imgURL:string= 'https://upskilling-egypt.com:3006/';
  dumyImage:string="../../../../../assets/images/profileDumy.jpg";
  //search 
  SearchValue = '';
    //search 
    
    serachByID:number =0
  //role
  roleID:number[] =[];
  //dialog 
  receipeItem: string= '' ;
  validData:boolean = false;
  
  

  constructor(  
    private _UsersService:UsersService , public dialog: MatDialog ,  private _router:Router ,
      private toastr: ToastrService){}
  
  ngOnInit() {
  this.getAllUsers()
  
  }

getAllUsers(){
  //to applay search 
  let params={
    [this.serachByID]:this.SearchValue ,
    groups:this.roleID,
    pageSize:this.pageSize,
    pageNumber:this.pageNumber
  }
      this._UsersService.getAllUsers(params).subscribe({
     
        //we need to pass token in header of interceptors to be able to see receipes
        next:(res)=>{
             console.log(res);
             this.loaded= true;
             this.listOfUsers= res;
             this.validData= true;
             console.log(this.listOfUsers);
            
            
        },
        error:()=>{

        },
        complete:()=>{

        }
      });
  }
 
 
  
  //delete user 

  openDeleteDialog(deltedId:number , name:string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id:deltedId , name:name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete  was closed');
       console.log( result);
       //check result 
       if(result){
        this.deleteReceipebyID(result)
        this.toastr.success('Userhas been deleted');
       }
      

    });
  }
  deleteReceipebyID(id:number){
    this._UsersService.deleteUser(id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:()=>{},
      complete:()=>{
         this.getAllUsers()
      },
  
    })
    }
  //////////////////////////////////////////////////////////////////////////
  /************ for search part  */
 


/////////////////////////////////////////////////////////////////////////

 
 
 

  //get by id
  //view category  not completetd
  openViewDialog(userdata:any):void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data:userdata,
    });
  }

 //////////////////////////////////////////////////////////////////////
 //pagination 
 pageChangeEvent(event: PageEvent) {
  this.pageNumber = event.pageIndex;
  this.pageSize = event.pageSize;
   this.getAllUsers()
}
resetSearcgInput(){
  this.SearchValue= '';
  this.getAllUsers();
}
}
