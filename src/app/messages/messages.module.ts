import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiActionsProviderFactory } from '../shared/api/api-actions-provider.factory';
import { ApiService } from '../shared/api/api.service';
import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { API_ACTIONS } from '../shared/api/api-actions.constant';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from './messages/messages.component';
import { MessagesApiActions } from './messages-api-actions';
import { MessagesRoutingModule } from './messages-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    declarations: [
        MessagesComponent
    ],
    imports: [
        NgxDatatableModule,
        CommonModule,
        MessagesRoutingModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        MessagesRoutingModule,
    ],
    providers: [
        ApiActionsProviderFactory.create(MessagesApiActions)
    ]
})
export class MessagesModule {
    constructor (apiService: ApiService, injector: Injector) {
        const apiActionContainers: ApiActionContainer[] = injector.get(API_ACTIONS);
        for (const container of apiActionContainers) {
            apiService.provideActions(container.actions);
        }
    }
}
