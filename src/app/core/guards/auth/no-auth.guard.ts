import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    const isValidSession = this.tokenService.isLogged() && !this.tokenService.isTokenExpired();

    if (isValidSession) {
      // Retorna UrlTree en lugar de llamar a navigate() y retornar false
      return this.router.createUrlTree(['/home']);
    }

    return true;
  }
}
