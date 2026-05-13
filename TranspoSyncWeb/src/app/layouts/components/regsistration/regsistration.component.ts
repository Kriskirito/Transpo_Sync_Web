import { Component, inject, Injectable, OnInit } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { FormConfigComponent } from '../../../shared/components/form-config/form-config.component';
import { BaseFormConfig } from '../../../shared/models/form-config';
import { registerForm } from './registration-constant';
import { validateFormGroup } from '../../../shared/functions/register.function';
import { RedirectService } from '../../../services/redirect-service';

@Component({
  selector: 'app-regsistration',
  standalone: true,
  imports: [FormConfigComponent],
  templateUrl: './regsistration.component.html',
  styleUrl: './regsistration.component.scss'
})
export class RegsistrationComponent implements OnInit {
  // variables
  public registerFormGroup!: BaseFormConfig;
  // end of variables


  ngOnInit(): void {
    this.initializeForms();
  }
  handleFormSubmit(formData: FormGroup): void {
    // Handle form submission
    validateFormGroup(formData);

  }

  initializeForms() {
    this.registerFormGroup = registerForm;
  }

}
