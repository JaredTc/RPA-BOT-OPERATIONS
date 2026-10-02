import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    const isValidSession = this.tokenService.isLogged() && !this.tokenService.isTokenExpired();

    if (!isValidSession) {
      return this.router.createUrlTree(['/auth/login']);
    }


    return true;
  }
}
