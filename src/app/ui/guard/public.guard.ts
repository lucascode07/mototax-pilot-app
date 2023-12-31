import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicRouteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('user-pilot')) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
