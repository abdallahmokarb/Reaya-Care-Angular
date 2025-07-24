import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { DoctorListComponent } from './pages/doctor/doctor-list/doctor-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'doctor-details/:id',
    loadComponent: () =>
      import('./pages/doctor/doctor-details/doctor-details').then((m) => m.DoctorDetails),
  },
  {
    path: 'doctor-list',
    component: DoctorListComponent,
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
        path: 'dashboard/profile',
        loadComponent: () =>
          import('./components/patient-profile/patient-profile').then((m) => m.PatientProfile),
      }
    ],
  },
];
