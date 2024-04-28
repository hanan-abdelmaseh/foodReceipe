import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const _AuthService= inject(AuthService)
  // to check if the user login
      const role= _AuthService.role ;
    if(localStorage.getItem('userToken') !== null  && role =='SuperAdmin' ){
  
      return true
    }
    else{
      //route to login page 
      router.navigateByUrl('/auth')
      return false;
  
    }
 
};


