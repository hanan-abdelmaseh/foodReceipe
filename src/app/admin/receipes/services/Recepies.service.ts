import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepiesService {


  constructor(private _HttpClient: HttpClient) { }


  getAllReceipes(ReceipeParmas:any):Observable<any>{
    //we need to pass parmas to the function  "pageNumber": 1, "pageSize": 10,
  return this._HttpClient.get('Recipe' , {params:ReceipeParmas});
  }
   //get Receipe by id
   getReceipeById(id:number) :Observable<any>{
    return this._HttpClient.get('Recipe/'+id)
  }
   //delete Receipe  
   deleteReceipe(id: number):Observable<any> {
    return this._HttpClient.delete("Recipe/"+id);
  }

  //post 
  AddRecipe(ReceipeName:any):Observable<any>{
    return this._HttpClient.post('Recipe',ReceipeName);
  }
  getAllTags():Observable<any>{
    //we need tags to use it to filter data 
  return this._HttpClient.get('tag');
  }

  //update receipe
updateRecipe(id:any ,receipeDate:any ):Observable<any>{
    return this._HttpClient.put("Recipe/"+id,receipeDate)
  }
  

}
