import { Component } from '@angular/core';
import { UserModel } from '../../../shared/models/user-model';
import { LoginUserModel, User_Default } from './user-constants';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { FormConfigComponent } from "../../../shared/components/form-config/form-config.component";
import { BaseFormConfig, FormFieldConfig } from '../../../shared/models/form-config';
import { FormGroup, Validators } from '@angular/forms';

/**
 * UserProfileComponent displays and manages the user's profile information.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  //#region Variables
  public userDetails: UserModel = User_Default;
  //#endregion

  //#region Constructor
  /**
   * Constructor with injected services.
   * @param authService AuthService for authentication logic
   */
  constructor(private readonly authService: AuthService) {
    const userData = sessionStorage.getItem(LoginUserModel);
    if (userData) {
      this.userDetails = JSON.parse(userData);
    }
  }
  //#endregion

  //#region Methods
  /**
   * Handles user sign out.
   */
  public handleSignOut(): void {
    this.authService.logout();
  }
  //#endregion


}
