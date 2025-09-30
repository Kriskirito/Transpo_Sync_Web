import { Validators } from "@angular/forms";
import { BaseFormConfig } from "../../../shared/models/form-config";
import { passwordValidator } from "../../../shared/functions/register.function";

export const registerForm: BaseFormConfig = {
    title: 'User Registration',
    formFields: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name',
            validators: [Validators.required]
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name',
            validators: [Validators.required]
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            validators: [Validators.required, Validators.email]
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Enter your phone number',
            validators: [Validators.required, Validators.pattern('^[0-9]*$')]
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter your password',
            isMultiple: true,
            validators: [Validators.required, Validators.minLength(6), passwordValidator()]
        }
    ]
};

export const Registration_Success = "Registration successful! Please check your email to verify your account.";
export const Registration_Failure = "Registration failed. Please try again later.";

export const Registration_UserExists = "User already exists with this email.";
export const Registration_InvalidData = "Invalid registration data. Please check your inputs.";

export const registerFormMessageCLass = {
    firstname_Required: "First name is required",
    firstname_Minerror: "Minimum 3 char required",
    lastname_Required: "Last name is required",
    lastname_Minerror: "Minimum 3 char required",
    email_Required: "Email is required",
    email_pattern: "Email should be in valid format",
    password_Required: "Password is required",
    password_pattern: "Password is required",
    phoneNumber_Required: "Phone number is required",
    phoneNumber_pattern: "Phone number should be in valid format",
}