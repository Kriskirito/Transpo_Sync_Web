import { Component, EventEmitter, inject, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseFormConfig } from '../../models/form-config';
import { required, message } from './form-config-constant';
import { UtilityService } from '../../../core/services/utility.service';
import { isRequiredMessage } from '../../functions/register.function';
import { RedirectService } from '../../../core/services/redirect.service';

@Component({
    selector: 'app-form-config',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-config.component.html',
    styleUrl: './form-config.component.scss'
})
export class FormConfigComponent implements OnInit, OnChanges {
    @Input() public formConfig!: BaseFormConfig;
    @Output() public formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    public redirectService = inject(RedirectService);
    public formGroup!: FormGroup;

    constructor(private _utilityService: UtilityService) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnChanges(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.formGroup = new FormGroup({});
        if (this.formConfig && this.formConfig.formFields) {
            this.formConfig.formFields.forEach(field => {
                this.formGroup.addControl(field.name, new FormControl('', field.validators));
            });
        }
    }

    public submitForm(): void {
        this.formSubmitted.emit(this.formGroup);
    }

    displayError(fieldName: string): string | null {
        const control = this.formGroup.get(fieldName);
        if (control && control.errors) {
            if (control.errors[required]) {
                return control.errors[message];
            }
        }
        return null;
    }

    resetForm(): void {
        this.formGroup.reset();
        this.redirectService.redirectToStoredUrl();
    }
}
