import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthOcService } from '../services/auth-oc.service';

export const authoOcGuard: CanActivateFn = (route, state) => {

  const authoOc = inject(AuthOcService)

  return new Promise((resolve, reject) => {
    authoOc.getSession().then((isLoggedIn: any) => {
      if (isLoggedIn) {
        resolve(true)
        return
      }
      authoOc.logOut();
      resolve(false)
    });
  })
};
