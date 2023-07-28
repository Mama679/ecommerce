import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

import {AuthService} from './auth.service';

export const authGuardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const ruta = inject(Router);

  if(!authService.token || !authService.user){
    ruta.navigate(['auth/login']);
    return false;
  }  

  let token = authService.token;
  let expiration =JSON.parse(atob(token.split(".")[1])).exp;

  if(Math.floor((new Date).getTime())/1000 >= expiration)
  {
    authService.logOut();
    return false;
  }

  return true;
};
