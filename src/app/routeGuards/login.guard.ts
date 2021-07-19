import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        const hasToken = this.hasToken();

        if (hasToken) {
            this.router.navigate(['/contratos']);
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
