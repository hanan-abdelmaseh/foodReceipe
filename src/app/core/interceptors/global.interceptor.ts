import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //request is url of api  without any addition 
     const apiUrl = "https://upskilling-egypt.com:3006/api/v1/" ;
     const token = localStorage.getItem('userToken')
      let newRequest = request.clone({
        // edit of url 
      url : apiUrl + request.url ,
      //so final url will be like https://upskilling-egypt.com:3006/api/v1/ from interceptor  
      //      +   users/login this from service 
      //we nned to pass token to be able to see categories
  setHeaders:{
    'Authorization': `${token}`
  }
      });


    return next.handle(newRequest);
  }
}
