import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { AllDoctors } from './pages/all-doctors/all-doctors';
import { PaymentCallbackComponent } from './pages/payment/payment-callback/payment-callback';
import { Contact } from './pages/contact/contact';
import { Specializations } from './pages/specializations/specializations';

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
        children: [
          {
            path: 'doctor',
            loadComponent: () =>
              import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
          },
        ],
      },

      {
        path: 'dashboard',
        children: [
          {
            path: 'patient',
            loadComponent: () =>
              import('./pages/dashboard-patient/dashboard-patient').then(
                (m) => m.DashboardPatient
              ),
          },
        ],
      },

      {
        path: 'dashboard/patient',
        children: [
          {
            path: 'test',
            loadComponent: () =>
              import('./pages/dashboard-patient/test-page/test-page').then(
                (m) => m.TestPage
              ),
          },
        ],
      },
      {
        path: 'dashboard/patient/profile',
        loadComponent: () =>
          import('./components/patient-profile/patient-profile').then(
            (m) => m.PatientProfile
          ),
      },

      {
        path: 'all-doctors',
        loadComponent: () =>
          import('./pages/all-doctors/all-doctors').then((m) => m.AllDoctors),
      },
      {
        path: 'appointment',
        loadComponent: () =>
          import('./pages/appointment/appointment').then(
            (m) => m.AppointmentComponent
          ),
      },

      {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then((m) => m.About),
      },
      {
        path: 'doctor-details/:id',
        loadComponent: () =>
          import('./pages/doctor-details/doctor-details').then(
            (m) => m.DoctorDetails
          ),
      },
      { path: 'contact', component: Contact },
        { path: 'specializations', component: Specializations },
      { path: 'payment/callback', component: PaymentCallbackComponent },
    ],
  },
];
