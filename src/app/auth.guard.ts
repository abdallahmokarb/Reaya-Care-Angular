import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    //  start sessionStorage and also localStorage
    const sessionData = sessionStorage.getItem('user');
    const localData = localStorage.getItem('user');

    const rawData = sessionData || localData;

    if (!rawData) {
      return this.router.parseUrl('/auth/login');
    }

    const user = JSON.parse(rawData);
    const userRoles = user?.roles || [];
    const url = state.url;

    // check roles based on url
    if (url.startsWith('/dashboard/patient') && userRoles.includes('Patient')) {
      return true;
    }

    if (url.startsWith('/dashboard/doctor') && userRoles.includes('Doctor')) {
      return true;
    }

    if (url.startsWith('/dashboard/admin') && userRoles.includes('Admin')) {
      return true;
    }

    // unauthorized
    return this.router.parseUrl('/unauthorized');
  }
}
