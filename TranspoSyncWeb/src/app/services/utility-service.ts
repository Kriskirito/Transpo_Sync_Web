import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { provideRouter } from "@angular/router";


@Injectable({
    providedIn: "root",
})

export class UtilityService {
    //Generic function only.
    filterByKey<T>(array: T[], key: keyof T, value: any): T[] {
        return array.filter(item => item[key] === value);
    }

    displayError(formGroupName: FormGroup, fieldName: string): string | null {
        const formGroup: FormGroup = formGroupName;
        const control = formGroup.get(fieldName);

        if (control && control.errors) {
            if (control.errors['required']) {
                return control.errors['message'];
            }
        }
        return null;
    }
}