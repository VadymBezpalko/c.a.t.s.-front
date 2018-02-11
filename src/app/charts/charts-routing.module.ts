import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { StockComponent } from './stock/stock.component';

export const routes: Routes = [
    { path: '', component: ChartsComponent, children: [
            { path: '', redirectTo: 'stock' },
            { path: 'stock', component: StockComponent }
            ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule {}
