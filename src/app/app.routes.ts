import { Routes } from '@angular/router';
import { ContentComponent } from './layout/content-component/content-component';
import { authGuard } from './core/guards/auth/auth.guard';
import { RoleGuard } from './core/guards/auth/role-guard.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then((m) => m.AuthenticationRoutes),
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        canActivate: [RoleGuard],
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HomeRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
