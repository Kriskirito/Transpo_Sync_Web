import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class RedirectService {
    private key = 'redirectFrom';

    public router = inject(Router);

    setRedirectUrl(url: string) {
        localStorage.setItem(this.key, url);
    }

    getRedirectUrl(): string {
        return localStorage.getItem(this.key) || '';
    }

    clearRedirectUrl() {
        localStorage.removeItem(this.key);
    }

    redirectToStoredUrl(navigateUrl?: string) {
        const url: string = navigateUrl ? navigateUrl : this.getRedirectUrl();
        this.router.navigate([url]);
        this.clearRedirectUrl();
    }
}
