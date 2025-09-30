import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { client_id } from './login-constants';
import { UserModel } from '../../../shared/models/user-model';
import { LoginUserModel } from '../user-profile/user-constants';
import { BaseFormConfig } from '../../../shared/models/form-config';
import { Validators } from '@angular/forms';
import { FormConfigComponent } from '../../../shared/components/form-config/form-config.component';
import { CommonModule } from '@angular/common';
import { RedirectService } from '../../../services/redirect-service';


declare var google: any;

/**
 * LoginComponent handles user authentication via Google Identity.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  /**
   * Constructor with injected services.
   * @param authService AuthService for authentication logic
   * @param router Router for navigation
   */
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly redirectService: RedirectService
  ) { }

  /**
   * Initializes the Google Identity button on component load.
   */
  ngOnInit(): void {
    if (window.hasOwnProperty('google') && google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id,
        callback: (response: UserModel) => this.handleCredentialResponse(response)
      });
      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        {
          theme: 'filled_blue',
          shape: 'rectangular',
          size: 'large',
          width: '100px'
        }
      );
    } else {
      console.error('Google Identity script not loaded!');
    }
  }

  /**
   * Handles the Google credential response.
   * @param response The credential response from Google
   */
  private handleCredentialResponse(response: any): void {
    try {
      const details = this.decodeToken(response.credential);
      sessionStorage.setItem(LoginUserModel, JSON.stringify(details));
      this.router.navigate(['/user-profile']);
    } catch (error) {
      console.error('Failed to handle credential response:', error);
    }
  }

  /**
   * Decodes a JWT token.
   * @param token The JWT token string
   * @returns Decoded token object
   */
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  openRegistrationForm(): void {
    this.redirectService.setRedirectUrl('')
    this.router.navigate(['/registration']);
  }
}
