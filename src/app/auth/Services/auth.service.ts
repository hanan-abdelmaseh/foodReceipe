import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from '../Interfaces/login';
import { IRegister } from '../Interfaces/register';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //we will use interceptors as we  don,t need to concat apiurl  in each service 

  //apiUrl:string = "https://upskilling-egypt.com:3006/api/v1/" ;

  constructor(private _HttpClient: HttpClient) {
    // reload page we need to save data 
      if(localStorage.getItem('userToken') !== null){
         this.getProfile();
      }
   }

  // we will decode token to check if he is user or admin 
/*----------------------------------------------------------------*/
  role :string |any = '';
  //get profile  2- step 2 of gaurds
  getProfile() {

    let encodedToken: any = localStorage.getItem("userToken");
    let decodedToken: any = jwtDecode(encodedToken);
    //
    console.log(decodedToken);
    console.log(decodedToken.userGroup);

    localStorage.setItem("role", decodedToken.userGroup);
   localStorage.setItem("userName", decodedToken.userName); 
// to save role 
    this.getRole();
    // steps 3 make admin , user guard

  }
  getRole() {
     if (localStorage.getItem("userToken") !== null && localStorage.getItem('role') !== null) {
      this.role = localStorage.getItem('role');
     }
  }

/*----------------------------------------------------------------*/
  //login 
  login(userData: ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', userData)
  }
  //register
  /* register(userinfo:IRegister) : Observable<any> >>will be changed
  as i send data include image so we need to send form data 
    */
  register(userinfo: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', userinfo)
  }
  // reset Password 
  resetPassword(userinfo: any): Observable<any> {
    return this._HttpClient.post('Users/Reset', userinfo)
  }
  //forget password 
  forgetPassword(userinfo: any): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', userinfo)
  }

  
 //verify account
 verifyAccount(userinfo: any): Observable<any> {
  return this._HttpClient.put('Users/verify', userinfo)
}
//get currnet user
getCurrentuser():Observable<any>{
  return this._HttpClient.get('Users/currentUser')
}
//updating profile data 
updatingProfile(userData:FormData):Observable<any>{
  return this._HttpClient.put('Users' , userData)
}
changePAssword(userData:any):Observable<any>{
  return this._HttpClient.put('Users/ChangePassword' , userData)
}


}