import { Component } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
    startDate = '2018-03-01';
    endDate = '2018-04-06';
    stockCompanies = [
        'bzw',
        'pkn',
        'opl',
        'pkp',
        'cdr',
        'bdx',
    ];
    searchSymbols = [
        'bzwbk',
        'orlen',
        'orange polska',
        'pkp cargo',
        'cd project red',
        'budimex',
    ];

    constructor(private api: ApiService) {
    }

    makeSentimentAnalysis() {
        this.api.run('makeSentimentAnalysis').subscribe(result => {
            console.log('sentiment analysis done');
        });
    }

    makeNER() {
        const requestList = [];
        this.searchSymbols.forEach(company => {
            requestList.push(
                this.api.run( 'makeNER', {search_term: company})
            );
        });
        forkJoin(requestList).subscribe(results => {
            console.log('done', results);
        });
    }

    makeTBNER() {
        const requestList = [];
        this.searchSymbols.forEach(company => {
            requestList.push(
                this.api.run( 'makeTBNER', {search_term: company})
            );
        });
        forkJoin(requestList).subscribe(results => {
            console.log('done', results);
        });
    }

    fetchStockData() {
        const requestList = [];
        this.stockCompanies.forEach(company => {
            requestList.push(
                this.api.runWith({
                    start_date: this.startDate,
                    end_date: this.endDate,
                    symbol: company,
                    format: 'csv'
                }, 'fetchStockData')
            );
        });
        forkJoin(requestList).subscribe(results => {
           console.log('done', results);
        });
    }

}
