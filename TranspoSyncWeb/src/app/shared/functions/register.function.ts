import { FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RegistrationForm } from '../../features/auth/registration/registration.model';
import { registerFormMessages } from '../../features/auth/registration/registration-constants';
import { BuiltInFormControlErrors } from '../models/built-in-validators-model';

export const validateFormGroup = (formGroup: FormGroup): void => {
    if (!formGroup) return;

    const registrationForm: RegistrationForm = formGroup.getRawValue();
    const { firstName, lastName, email, password, phoneNumber } = registrationForm;

    if (!firstName || firstName.length < 3 || typeof firstName !== 'string') {
        const errorMessage = firstName ? registerFormMessages.firstname_Minerror : registerFormMessages.firstname_Required;
        formGroup.get('firstName')?.setErrors({ required: true, message: errorMessage });
    }

    if (!lastName || lastName.length < 3 || typeof lastName !== 'string') {
        const errorMessage = lastName ? registerFormMessages.lastname_Minerror : registerFormMessages.lastname_Required;
        formGroup.get('lastName')?.setErrors({ required: true, message: errorMessage });
    }

    if (!email || email.length > 0 || typeof email !== 'string') {
        const errorMessage = customeCheckandValidatedMessage(formGroup, 'email') || null;
        if (errorMessage) formGroup.get('email')?.setErrors({ required: true, message: errorMessage });
    }

    if (!password || password.length > 0 || typeof password !== 'string') {
        const errorMessage = customeCheckandValidatedMessage(formGroup, 'password') || null;
        if (errorMessage) formGroup.get('password')?.setErrors({ required: true, message: errorMessage });
    }

    if (!phoneNumber || phoneNumber.length > 0 || typeof phoneNumber !== 'string') {
        const errorMessage = customeCheckandValidatedMessage(formGroup, 'phoneNumber') || null;
        if (errorMessage) formGroup.get('phoneNumber')?.setErrors({ required: true, message: errorMessage });
    }
};

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return { required: true };

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);
        const isValidLength = value.length >= 8;
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;

        return !passwordValid ? { passwordStrength: registerFormMessages.password_pattern } : null;
    };
}

export const isRequiredMessage = (fieldName: string): string => `${fieldName} is required`;

export const customeCheckandValidatedMessage = (formGroup: FormGroup, controlName: string): string | null => {
    const control: ValidationErrors | null | undefined = formGroup.get(controlName)?.errors;
    const errors: BuiltInFormControlErrors = control as BuiltInFormControlErrors;

    if (errors) {
        if (errors['minlength']) return `${controlName} must be at least ${errors['minlength'].requiredLength} characters long`;
        if (errors['maxlength']) return `${controlName} cannot be more than ${errors['maxlength'].requiredLength} characters long`;
        if (errors['pattern']) return `${controlName} is not in the correct format`;
        if (errors['email']) return `${controlName} is not a valid email address`;
        if (errors['min']) return `${controlName} must be at least ${errors['min'].min}`;
        if (errors['max']) return `${controlName} cannot be more than ${errors['max'].max}`;
        if (errors['required']) return isRequiredMessage(controlName);
    }
    return null;
};
