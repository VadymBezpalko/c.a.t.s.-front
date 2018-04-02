import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
    stockData: any;
    twitterData: any;
    selectedOption: any;
    options = [
        {twitterSearchTerm: 'bzwbk', stockSymbol: 'bzw'},
        {twitterSearchTerm: 'orlen', stockSymbol: 'pkn'},
        {twitterSearchTerm: 'orange polska', stockSymbol: 'opl'},
        {twitterSearchTerm: 'pkp cargo', stockSymbol: 'pkp'},
        {twitterSearchTerm: 'cd project red', stockSymbol: 'cdr'},
        {twitterSearchTerm: 'budimex', stockSymbol: 'bdx'}
    ];
    from: any;
    to: any;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.from = '2018-03-01';
        this.to = '2018-03-31';
        this.getChartData(this.options[0]);
    }

    getChartData(selectedOption) {
        this.selectedOption = selectedOption;
        this.api.run('getStockData', {
            symbol: selectedOption.stockSymbol,
            from: this.from,
            to: this.to
        }).subscribe(stockData => {
            this.stockData = stockData;
        });
        this.api.run('getTwitterData', {
            search_term: selectedOption.twitterSearchTerm,
            from: this.from,
            to: this.to
        }).subscribe(twitterData => {
            this.twitterData = twitterData;
        });
    }

}
