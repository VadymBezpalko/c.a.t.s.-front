import { FormGroup, ValidationErrors } from '@angular/forms';
export class ValidationService {
    bindErrors(errors: ValidationErrors, form: FormGroup) {
        Object.keys(errors).map(key => {
            if (form.get(key)) {
                form.get(key).setErrors({
                    apiMessage: errors[key]
                });
            }
        });
    }
}