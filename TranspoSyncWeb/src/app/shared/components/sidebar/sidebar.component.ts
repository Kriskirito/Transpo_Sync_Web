import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
    label: string;
    route: string;
    icon: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    public collapsed = signal<boolean>(false);

    public readonly navItems: NavItem[] = [
        { label: 'Dashboard', route: '/app/dashboard', icon: 'dashboard' },
        { label: 'Transport', route: '/app/transport', icon: 'transport' },
        { label: 'Inventory', route: '/app/inventory', icon: 'inventory' },
        { label: 'Profile', route: '/app/user-profile', icon: 'profile' },
    ];

    toggleCollapse(): void {
        this.collapsed.update(v => !v);
    }
}
