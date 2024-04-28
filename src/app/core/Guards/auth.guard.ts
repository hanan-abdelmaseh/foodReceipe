import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



/* 
constructor (private _Router:Router ) > can't be use in angular 16 
*/
//const router = new Router();

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
// to check if the user login
  
  if(localStorage.getItem('userToken') !== null ){

    return true
  }
  else{
    //route to login page 
    router.navigateByUrl('/auth')
    return false;

  }

};

