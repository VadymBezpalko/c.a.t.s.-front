import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiActionsProviderFactory } from '../shared/api/api-actions-provider.factory';
import { ChartsApiActions } from './charts-api-actions';
import { StockComponent } from './stock/stock.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
    declarations: [
        ChartsComponent,
        StockComponent
    ],
    imports: [
        CommonModule,
        ChartsRoutingModule
    ],
    exports: [
        ChartsRoutingModule
    ],
    providers: [
        ApiActionsProviderFactory.create(ChartsApiActions)
    ]
})
export class ChartsModule {
}
