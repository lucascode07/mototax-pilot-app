import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const privateRoutesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('user-pilot')) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
