import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormConfigComponent } from '../../../shared/components/form-config/form-config.component';
import { BaseFormConfig } from '../../../shared/models/form-config';
import { registerForm } from './registration-constants';
import { validateFormGroup } from '../../../shared/functions/register.function';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, FormConfigComponent],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
    public registerFormGroup!: BaseFormConfig;

    ngOnInit(): void {
        this.initializeForms();
    }

    handleFormSubmit(formData: FormGroup): void {
        validateFormGroup(formData);
    }

    private initializeForms(): void {
        this.registerFormGroup = registerForm;
    }
}
