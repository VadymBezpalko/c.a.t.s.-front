import { ClassProvider } from '@angular/core';
import { API_ACTIONS } from './api-actions.constant';

export class ApiActionsProviderFactory {
    public static create(actions): ClassProvider {
        return {
            provide: API_ACTIONS,
            useClass: actions,
            multi: true
        };
    }
}
