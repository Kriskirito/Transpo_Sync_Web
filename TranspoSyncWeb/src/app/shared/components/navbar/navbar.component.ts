import { Component, inject, computed } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../models/user-model';

const LOGIN_USER_KEY = 'loginUserModel';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    public readonly userDetails = computed<UserModel | null>(() => {
        const raw = sessionStorage.getItem(LOGIN_USER_KEY);
        return raw ? JSON.parse(raw) : null;
    });

    public readonly userInitials = computed(() => {
        const user = this.userDetails();
        if (!user) return 'U';
        return `${user.given_name?.charAt(0) ?? ''}${user.family_name?.charAt(0) ?? ''}`.toUpperCase() || 'U';
    });

    public showDropdown = false;

    toggleDropdown(): void {
        this.showDropdown = !this.showDropdown;
    }

    handleSignOut(): void {
        this.showDropdown = false;
        this.authService.logout();
    }
}
