import { Routes } from '@angular/router';
import { MainLayout } from './components/layout/main-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { AllDoctors } from './pages/all-doctors/all-doctors';
import { PaymentCallbackComponent } from './pages/payment/payment-callback/payment-callback';
import { AuthGuard } from './auth.guard';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { Contact } from './pages/contact/contact';
import { Specializations } from './pages/specializations/specializations';
import { Appointment } from './pages/appointment/appointment';

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
            canActivate: [AuthGuard],
            loadComponent: () =>
              import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
          },
          {
            path: 'doctor/onboarding',
            loadComponent: () =>
              import('./components/doctor-onboarding/doctor-onboarding').then(
                (m) => m.DoctorOnboarding
              ),
          },
          {
            path: 'doctor/timeslots',
            loadComponent: () =>
              import(
                './pages/dashboard/doctor-timeslots/doctor-timeslots'
              ).then((m) => m.DoctorTimeslots),
          },
        ],
      },

      {
        path: 'dashboard',
        children: [
          {
            path: 'patient',
            canActivate: [AuthGuard],
            loadComponent: () =>
              import('./pages/dashboard-patient/dashboard-patient').then(
                (m) => m.DashboardPatient
              ),
          },
        ],
      },

      {
        path: 'dashboard',
        children: [
          {
            path: 'admin',
            canActivate: [AuthGuard],
            loadComponent: () =>
              import('./pages/dashboard-admin/admin-dashboard').then(
                (m) => m.AdminDashboard
              ),
          },
        ],
      },
      {
        path: 'dashboard/patient/profile',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./components/patient-profile/patient-profile').then(
            (m) => m.PatientProfile
          ),
      },
      {
        path: 'dashboard/patient/my-payments',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./pages/dashboard-patient/my-payments/my-payments').then(
            (m) => m.MyPayments
          ),
      },
      {
        path: 'dashboard/patient/my-payments/refund-details',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './pages/dashboard-patient/my-payments/refund-details/refund-details'
          ).then((m) => m.RefundDetails),
      },
      {
        path: 'dashboard/patient/my-appointments',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './pages/dashboard-patient/my-appointments/my-appointments'
          ).then((m) => m.MyAppointments),
      },
      {
        path: 'dashboard/admin/manage-patients',
        loadComponent: () =>
          import(
            './pages/manage-patients/manage-patients'
          ).then((m) => m.ManagePatients),
      },{
        path: 'dashboard/admin/manage-doctors',
        loadComponent: () =>
          import(
            './pages/admin-doctor/admin-doctor'
          ).then((m) => m.AdminDoctorComponent),
      },
<<<<<<< HEAD
      {
        path: 'dashboard/admin/admin-management',
        loadComponent: () =>
          import(
            './pages/admin-management/admin-management'
          ).then((m) => m.AdminManagement)
      },
      {
=======
          {
>>>>>>> main
        path: 'all-doctors',
        loadComponent: () =>
          import('./pages/all-doctors/all-doctors').then((m) => m.AllDoctors),
      },
      {
        path: 'all-doctors/:id',
        loadComponent: () =>
          import('./pages/all-doctors/all-doctors').then((m) => m.AllDoctors),
      },
      {
        path: 'doctor-call/:id',
        loadComponent: () =>
          import('./pages/doctor-call/doctor-call').then((m) => m.DoctorCall),
      },
      {
        path: 'patient-call/:id',
        loadComponent: () =>
          import('./pages/patient-call/patient-call').then(
            (m) => m.PatientCall
          ),
        },
        
      {
        path: 'appointment',
        loadComponent: () =>
          import('./pages/appointment/appointment').then((m) => m.Appointment),
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

      {
        path: 'booking-confirmation',
        loadComponent: () =>
          import(
            './pages/payment/booking-confirmation/booking-confirmation'
          ).then((m) => m.BookingConfirmation),
      },

      {
        path: 'unauthorized',
        component: Unauthorized,
      },

      { path: 'appointments', component: Appointment },
      { path: 'all-doctors', component: AllDoctors }, // for routing
    ],
  },
  {
    path: 'recorder',
    loadComponent: () =>
      import('./components/recorder/recorder').then((m) => m.RecorderComponent),
  },
];
