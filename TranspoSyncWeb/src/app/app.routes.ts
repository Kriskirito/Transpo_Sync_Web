import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registration',
        loadComponent: () => import('./features/auth/registration/registration.component').then(m => m.RegistrationComponent)
    },
    {
        path: 'app',
        loadComponent: () => import('./shared/components/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'transport',
                loadComponent: () => import('./features/transport/transport-list/transport-list.component').then(m => m.TransportListComponent)
            },
            {
                path: 'inventory',
                loadComponent: () => import('./features/inventory/inventory-list/inventory-list.component').then(m => m.InventoryListComponent)
            },
            {
                path: 'user-profile',
                loadComponent: () => import('./features/user/user-profile/user-profile.component').then(m => m.UserProfileComponent)
            },
        ]
    },
    { path: 'user-profile', redirectTo: '/app/user-profile', pathMatch: 'full' },
    { path: '**', redirectTo: '' }
];
