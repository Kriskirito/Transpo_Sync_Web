import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../shared/models/user-model';
import { User_Default, LOGIN_USER_KEY } from './user-constants';
import { AuthService } from '../../../core/services/auth.service';

interface Preference {
    icon: string;
    iconBg: string;
    label: string;
    desc: string;
    enabled: boolean;
}

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
    private readonly _userDetails = signal<UserModel>(User_Default);

    public readonly userDetails = this._userDetails.asReadonly();

    public readonly userInitials = computed(() => {
        const u = this._userDetails();
        if (!u?.name) return 'U';
        return u.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    });

    public preferences: Preference[] = [
        { icon: '🔔', iconBg: 'bg-blue-50 dark:bg-blue-500/10',   label: 'Email Notifications', desc: 'Receive shipment status updates', enabled: true },
        { icon: '🌙', iconBg: 'bg-slate-100 dark:bg-white/8',      label: 'Dark Mode',            desc: 'Use dark theme across the app',  enabled: false },
        { icon: '📊', iconBg: 'bg-violet-50 dark:bg-violet-500/10',label: 'Analytics Reports',   desc: 'Weekly performance summaries',   enabled: true },
        { icon: '🔐', iconBg: 'bg-amber-50 dark:bg-amber-500/10',  label: 'Two-Factor Auth',     desc: 'Extra security on sign-in',      enabled: false },
    ];

    constructor(private readonly authService: AuthService) {
        const userData = sessionStorage.getItem(LOGIN_USER_KEY);
        if (userData) {
            try {
                this._userDetails.set(JSON.parse(userData));
            } catch {
                this._userDetails.set(User_Default);
            }
        }
    }

    togglePref(pref: Preference): void {
        pref.enabled = !pref.enabled;
    }

    handleSignOut(): void {
        this.authService.logout();
    }
}
