import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { StockComponent } from './stock/stock.component';
import { ApiService } from '../shared/api/api.service';

@Injectable()
export class StockDataResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.run('getStockData', { sortBy: 'date' });
    }
}

@Injectable()
export class TwitterDataResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.run('getTwitterData');
    }
}

export const routes: Routes = [
    { path: '', component: ChartsComponent, children: [
            { path: '', redirectTo: 'stock' },
            { path: 'stock', component: StockComponent, resolve: {stockData: StockDataResolver, twitterData: TwitterDataResolver} }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [StockDataResolver, TwitterDataResolver]
})
export class ChartsRoutingModule {}
