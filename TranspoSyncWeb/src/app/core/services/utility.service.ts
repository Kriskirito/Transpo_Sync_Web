import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UtilityService {
    filterByKey<T>(array: T[], key: keyof T, value: any): T[] {
        return array.filter(item => item[key] === value);
    }

    displayError(formGroupName: FormGroup, fieldName: string): string | null {
        const control = formGroupName.get(fieldName);
        if (control && control.errors) {
            if (control.errors['required']) {
                return control.errors['message'];
            }
        }
        return null;
    }
}
