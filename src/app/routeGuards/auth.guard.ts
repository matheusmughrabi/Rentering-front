import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        const hasToken = this.hasToken();

        if (!hasToken) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }

    public hasToken(): boolean {
        const data = localStorage.getItem('token');

        if (data) {
            return true;
        }

        return false;
    }
}
