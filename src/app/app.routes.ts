import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { AllDoctors } from './pages/all-doctors/all-doctors';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },

      {
        path: 'all-doctors',
        loadComponent: () =>
          import('./pages/all-doctors/all-doctors').then((m) => m.AllDoctors),
      },
    ],
  },

  
];
