import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout';
import { AuthLayout } from './components/layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
<<<<<<< HEAD
=======
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.LoginComponent),
  },
 
  {path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'appointment',
    loadComponent: () =>
      import('./components/appointment/appointment').then((m) => m.AppointmentComponent),
  },
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)

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
<<<<<<< HEAD
=======
      {
        path: 'dashboard/profile',
        loadComponent: () =>
          import('./components/patient-profile/patient-profile').then((m) => m.PatientProfile),
      }
>>>>>>> 118c175 (feat: initialize Angular application with basic structure and configurations)
    ],
  },
];
