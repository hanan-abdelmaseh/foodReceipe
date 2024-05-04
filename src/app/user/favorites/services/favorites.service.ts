import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private _HttpClient: HttpClient) { }
  getAllfavorites():Observable<any>{
    //we need to pass parmas to the function  "pageNumber": 1, "pageSize": 10,
  return this._HttpClient.get('userRecipe/');
  }
   //get Receipe by id
   addtofav(recipeId:any) :Observable<any>{
    return this._HttpClient.post('userRecipe/' ,{recipeId:recipeId} )
  }
   // Receipe  
   deletefav(id: number):Observable<any> {
    return this._HttpClient.delete("userRecipe/"+id);
  }
  }
  


