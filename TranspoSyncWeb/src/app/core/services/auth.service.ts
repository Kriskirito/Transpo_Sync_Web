declare var google: any;
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public router = inject(Router);

    logout(): void {
        if (window.hasOwnProperty('google') && google?.accounts?.id) {
            google.accounts.id.disableAutoSelect();
        }
        sessionStorage.removeItem('loginUserModel');
        this.router.navigate(['']);
    }

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem('loginUserModel');
    }
}
