/**
 * Configuration for a single form field.
 */
export interface FormFieldConfig {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    isMultiple?: boolean;
    validators?: any[];
}

/**
 * Configuration for a generic form.
 * Contains an array of field configs.
 */
export interface BaseFormConfig {
    title?: string;
    formFields: FormFieldConfig[];
}