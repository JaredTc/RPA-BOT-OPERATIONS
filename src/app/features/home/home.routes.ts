import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((c) => c.Home),
  },
];
