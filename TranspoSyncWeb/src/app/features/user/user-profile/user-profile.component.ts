import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserModel } from '../../../shared/models/user-model';
import { User_Default, LOGIN_USER_KEY } from './user-constants';
import { AuthService } from '../../../core/services/auth.service';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

/**
 * UserProfileComponent displays and manages the authenticated user's profile.
 */
@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, DatePipe, AnimateOnScrollDirective],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
    public userDetails: UserModel = User_Default;

    constructor(private readonly authService: AuthService) {
        const userData = sessionStorage.getItem(LOGIN_USER_KEY);
        if (userData) {
            this.userDetails = JSON.parse(userData);
        }
    }

    public handleSignOut(): void {
        this.authService.logout();
    }
}
