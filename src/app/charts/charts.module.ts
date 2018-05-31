import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiActionsProviderFactory } from '../shared/api/api-actions-provider.factory';
import { ChartsApiActions } from './charts-api-actions';
import { StockComponent } from './stock/stock.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { ApiService } from '../shared/api/api.service';
import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { API_ACTIONS } from '../shared/api/api-actions.constant';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockSecondComponent } from './stock-second/stock-second.component';

@NgModule({
    declarations: [
        ChartsComponent,
        StockComponent,
        StockSecondComponent
    ],
    imports: [
        CommonModule,
        ChartsRoutingModule,
        FormsModule,
        NgbModule
    ],
    exports: [
        ChartsRoutingModule,
    ],
    providers: [
        ApiActionsProviderFactory.create(ChartsApiActions)
    ]
})
export class ChartsModule {
    constructor (apiService: ApiService, injector: Injector) {
        const apiActionContainers: ApiActionContainer[] = injector.get(API_ACTIONS);
        for (const container of apiActionContainers) {
            apiService.provideActions(container.actions);
        }
    }
}
