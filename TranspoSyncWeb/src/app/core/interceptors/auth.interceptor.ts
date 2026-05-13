import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userData = sessionStorage.getItem('loginUserModel');
    if (userData) {
        try {
            const parsed = JSON.parse(userData);
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${parsed?.jti ?? ''}`
                }
            });
            return next(cloned);
        } catch {
            return next(req);
        }
    }
    return next(req);
};
