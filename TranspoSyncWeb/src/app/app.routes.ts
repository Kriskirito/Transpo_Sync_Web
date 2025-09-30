import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./layouts/components/login/login.component').then(m => m.LoginComponent) },
    { path: 'user-profile', loadComponent: () => import('./layouts/components/user-profile/user-profile.component').then(m => m.UserProfileComponent) },
    { path: 'registration', loadComponent: () => import('./layouts/components/regsistration/regsistration.component').then(m => m.RegsistrationComponent) },
];
