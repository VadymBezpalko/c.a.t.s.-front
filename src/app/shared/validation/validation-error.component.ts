import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.scss']
})
export class ValidationErrorComponent {
    @Input() field: FormControl;
}