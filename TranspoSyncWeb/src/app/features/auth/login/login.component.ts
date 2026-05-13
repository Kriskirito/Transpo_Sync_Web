declare var google: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RedirectService } from '../../../core/services/redirect.service';
import { client_id } from './login-constants';
import { UserModel } from '../../../shared/models/user-model';

const LOGIN_USER_KEY = 'loginUserModel';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public readonly features = [
        { icon: '🚛', title: 'Fleet Tracking', desc: 'Real-time vehicle monitoring' },
        { icon: '📦', title: 'Shipment Management', desc: 'End-to-end shipment visibility' },
        { icon: '📊', title: 'Analytics & Reports', desc: 'Data-driven insights' },
    ];

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly redirectService: RedirectService
    ) {}

    ngOnInit(): void {
        if (window.hasOwnProperty('google') && google?.accounts?.id) {
            google.accounts.id.initialize({
                client_id,
                callback: (response: any) => this.handleCredentialResponse(response)
            });
            google.accounts.id.renderButton(
                document.getElementById('google-btn'),
                { theme: 'outline', shape: 'rectangular', size: 'large', width: '280px' }
            );
        } else {
            console.error('Google Identity script not loaded!');
        }
    }

    private handleCredentialResponse(response: any): void {
        try {
            const details = this.decodeToken(response.credential);
            sessionStorage.setItem(LOGIN_USER_KEY, JSON.stringify(details));
            this.router.navigate(['/app/dashboard']);
        } catch (error) {
            console.error('Failed to handle credential response:', error);
        }
    }

    private decodeToken(token: string): UserModel {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            console.error('Invalid token:', error);
            return {} as UserModel;
        }
    }

    openRegistrationForm(): void {
        this.redirectService.setRedirectUrl('');
        this.router.navigate(['/registration']);
    }
}
