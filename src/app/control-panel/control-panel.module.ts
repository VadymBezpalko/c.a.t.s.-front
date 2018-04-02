import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiActionsProviderFactory } from '../shared/api/api-actions-provider.factory';
import { NerApiActions } from './control-panel-api-actions';
import { NerRoutingModule } from './control-panel-routing.module';
import { ApiService } from '../shared/api/api.service';
import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { API_ACTIONS } from '../shared/api/api-actions.constant';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
    declarations: [
        ControlPanelComponent
    ],
    imports: [
        CommonModule,
        NerRoutingModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        NerRoutingModule,
    ],
    providers: [
        ApiActionsProviderFactory.create(NerApiActions)
    ]
})
export class ControlPanelModule {
    constructor (apiService: ApiService, injector: Injector) {
        const apiActionContainers: ApiActionContainer[] = injector.get(API_ACTIONS);
        for (const container of apiActionContainers) {
            apiService.provideActions(container.actions);
        }
    }
}
