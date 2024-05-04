import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private _HttpClient: HttpClient) { }
getAllUsers(Parmas:any):Observable<any>{
  //we need to pass parmas to the function  "pageNumber": 1, "pageSize": 10,
return this._HttpClient.get('Users' , {params:Parmas});
}
 //get Receipe by id
 getUserById(id:number) :Observable<any>{
  return this._HttpClient.get('Users/'+id)
}
 //delete Receipe  
 deleteUser(id: number):Observable<any> {
  return this._HttpClient.delete("Users/"+id);
}
}
