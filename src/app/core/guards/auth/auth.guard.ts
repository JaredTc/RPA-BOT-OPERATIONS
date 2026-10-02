import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  // Unificamos la validación
  const isValidSession = tokenService.isLogged() && !tokenService.isTokenExpired();

  if (!isValidSession) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};
