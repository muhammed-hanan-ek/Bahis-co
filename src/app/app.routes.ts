import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./Pages/Auth/sign-in/sign-in.routes'),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./Pages/Auth/forgot-password/forgot-password.routes'),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./Pages/Auth/reset-password/reset-password.routes'),
      },
    ],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'user-management',
        loadChildren: () =>
          import('./Pages/user-management/user-management.routes'),
      },
      {
        path: 'work',
        loadChildren: () =>
          import('./Pages/staff-work-management/staff-work-management.routes'),
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('./Pages/admin-dashboard/admin-dashboard.routes'),
      },
      {
        path: 'ads',
        loadChildren: () =>
          import('./Pages/ads-management/ads-management.routes'),
      },
      {
        path: 'client-dashboard',
        loadChildren: () =>
          import('./Pages/client-dashboard/client-dashboard.routes'),
      },
      {
        path: 'staff-dashboard',
        loadChildren: () =>
          import('./Pages/staff-dashboard/staff-dashboard.routes'),
      },
    ],
  },
];
