import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'app-control-panel',
    templateUrl: './control-panel.component.html',
    styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit{
    @ViewChild('chart') el: ElementRef;
    statsData;
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

    ngOnInit() {
        this.api.run('getRetweetStats').subscribe(data => {
            this.statsData = data;
            this.setStatsData(data);
            this.renderChart();
        });
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

    setStatsData(data) {
        const temp = [];
        for (const prop in this.statsData) {
            if (this.statsData.hasOwnProperty(prop)) {
                temp.push([prop, this.statsData[prop]]);
            }
        }

        temp.sort((a, b) => b[0] - a[0]);

        this.statsData['x'] = [];
        this.statsData['y'] = [];

        temp.forEach(item => {
            this.statsData['x'].push(item[0]);
            this.statsData['y'].push(item[1]);
        });
    }

    renderChart() {
        const element = this.el.nativeElement;

        const trace1 = {
            x: this.statsData.x,
            y: this.statsData.y,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Liczba retweetów '
        };

        const layout = {
            yaxis: {
                type: 'log',
                autorange: true,
                title: 'Liczba wiadomości'

            },
            xaxis: {
                title: 'Liczba retweetów'
            }
        };

        Plotly.newPlot(element, [trace1], layout);
    }


}
