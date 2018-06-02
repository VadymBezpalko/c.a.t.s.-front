import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { StockComponent } from './stock/stock.component';
import { ApiService } from '../shared/api/api.service';
import { StockSecondComponent } from './stock-second/stock-second.component';

@Injectable()
export class StockDataResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.run('getStockData', { sortBy: route.paramMap.get('sortBy'), symbol: route.paramMap.get('symbol') });
    }
}

@Injectable()
export class TwitterDataResolver implements Resolve<any> {
    constructor(private api: ApiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.api.run('getTwitterData', { search_term: route.paramMap.get('search_term') });
    }
}

export const routes: Routes = [
    { path: 'first', component: ChartsComponent },
    { path: 'second', component: StockSecondComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [StockDataResolver, TwitterDataResolver]
})
export class ChartsRoutingModule {}
