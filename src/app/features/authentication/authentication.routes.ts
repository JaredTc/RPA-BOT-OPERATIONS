import { Routes } from '@angular/router';
import { NoAuthGuard } from '../../core/guards/auth/no-auth.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () => import('./login/login').then((c) => c.Login),
  },

  // Otras rutas hijas
];
