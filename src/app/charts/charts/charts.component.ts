import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
    stockData: any;
    twitterData: any;
    selectedOption: any;
    options = [
        {twitterSearchTerm: 'orlen', stockSymbol: 'pkn'},
        {twitterSearchTerm: 'bzwbk', stockSymbol: 'bzw'},
        {twitterSearchTerm: 'orange polska', stockSymbol: 'opl'},
        {twitterSearchTerm: 'pkp cargo', stockSymbol: 'pkp'},
        {twitterSearchTerm: 'cd project red', stockSymbol: 'cdr'},
        {twitterSearchTerm: 'budimex', stockSymbol: 'bdx'}
    ];

    constructor(private api: ApiService) {
    }

    getChartData(selectedOption) {
        this.api.run('getStockData', {sortBy: 'date', symbol: selectedOption.stockSymbol}).subscribe(stockData => {
            this.stockData = stockData;
        });
        this.api.run('getTwitterData', { search_term: selectedOption.twitterSearchTerm }).subscribe(twitterData => {
            this.twitterData = twitterData;
        });
    }

}
