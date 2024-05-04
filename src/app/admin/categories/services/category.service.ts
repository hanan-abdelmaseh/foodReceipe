import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(private _HttpClient: HttpClient) { }


getAllCategories(parmas:any):Observable<any>{
  //we need to pass parmas to the function  "pageNumber": 1, "pageSize": 10,
return this._HttpClient.get('Category' , {params:parmas});
}
getAllCategoriesForReceipes(pNumber:number , pSize:number):Observable<any>{
  //we need to pass parmas to the function  "pageNumber": 1, "pageSize": 10,
return this._HttpClient.get('Category' , {params:{pageNumber:pNumber ,pageSize:pSize}});
}

AddCategory(categoryName:string):Observable<any>{
  return this._HttpClient.post('Category',{name:categoryName});
}

//get category by id
getCategoryById(id:number) :Observable<any>{
  return this._HttpClient.get('Category/'+id)
}
 //delete category  
 deletecategory(id: number):Observable<any> {
  return this._HttpClient.delete("Category/"+id);
}
//update category
updateCetegory(id:number ,categoryName:string ):Observable<any>{
  return this._HttpClient.put("Category/"+id , {name:categoryName})
}


}
