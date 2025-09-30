export interface BuiltInFormControlErrors {
    required?: boolean;
    minlength?: {
        requiredLength: number;
        actualLength: number;
    };
    maxlength?: {
        requiredLength: number;
        actualLength: number;
    };
    pattern?: {
        requiredPattern: string;
        actualValue: string;
    };
    email?: boolean;
    min?: {
        min: number;
        actual: number;
    };
    max?: {
        max: number;
        actual: number;
    };
}
