import { TranspoModel } from '../../../shared/models/transpo-model';

export interface RegistrationForm extends TranspoModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}
