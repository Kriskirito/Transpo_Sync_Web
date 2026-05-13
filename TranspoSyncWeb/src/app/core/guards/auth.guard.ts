import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const userData = sessionStorage.getItem('loginUserModel');
    if (userData) {
        return true;
    }
    router.navigate(['']);
    return false;
};
