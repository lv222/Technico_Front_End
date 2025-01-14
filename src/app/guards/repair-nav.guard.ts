import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const repairNavGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenPresent()) {
    const userType = authService.getUserType(); // Get the userType from decoded JWT

    if (userType === 'Admin') {
      return true;
    } else if (userType === 'User') {
      router.navigate(['/']);
      return false;
    }
  }

  router.navigate(['/login']);
  return false;
};
