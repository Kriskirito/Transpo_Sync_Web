declare var google: any; // Documentation purpose we used here
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    //inject services here
    public router = inject(Router);
    //endregion of inject services

    // constructor(private http: HttpClient) { }
    // loginWithGoogle(idToken: string) {
    //     return this.http.post('/api/auth/google', { idToken });
    // }

    logout(): void {
        google.accounts.id.disableAutoSelect();
        this.router.navigate(['']);
    }
}