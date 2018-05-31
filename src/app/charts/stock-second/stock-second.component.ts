import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api/api.service';

@Component({
    selector: 'app-stock-second',
    templateUrl: './stock-second.component.html',
    styleUrls: ['./stock-second.component.scss']
})
export class StockSecondComponent implements OnInit {
    @ViewChild('chart') el: ElementRef;
    stockData: any;
    twitterData: any;
    selectedOption: any;
    allMessagesCorrelation;
    positiveMessagesCorrelation;
    negativeMessagesCorrelation;
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
    trase1 = { // stock data
        x: [],
        y: []
    };
    trase2 = { // neutral data
        x: [],
        y: []
    };
    trase3 = { // positive data
        x: [],
        y: []
    };
    trase4 = { // negative data
        x: [],
        y: []
    };

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.from = '2018-03-05';
        this.to = '2018-05-30';
        this.getChartData(this.options[0]);
    }

    clearTraces() {
        this.trase1 = { // stock data
            x: [],
            y: []
        };
        this.trase2 = { // neutral data
            x: [],
            y: []
        };
        this.trase3 = { // positive data
            x: [],
            y: []
        };
        this.trase4 = { // negative data
            x: [],
            y: []
        };
    }

    getChartData(selectedOption) {
        this.clearTraces();
        this.selectedOption = selectedOption;
        this.api.run('getStockData', {
            symbol: selectedOption.stockSymbol,
            from: this.from,
            to: this.to
        }).subscribe(stockData => {
            this.stockData = stockData;
            this.stockData.forEach((item) => {
                this.trase1.x.push(item.date);
                this.trase1.y.push(item.close);
            });
        });

        this.api.run('getDifferentTwitterData', {
            search_term: selectedOption.twitterSearchTerm,
            from: this.from,
            to: this.to
        }).subscribe(twitterData => {
            this.twitterData = twitterData;
            this.twitterData.forEach((item) => {
                this.trase2.x.push(item.date);
                this.trase2.y.push(item.neutral);

                this.trase3.x.push(item.date);
                this.trase3.y.push(item.positive);

                this.trase4.x.push(item.date);
                this.trase4.y.push(item.negative);
            });

            this.basicChart();
        });

        this.api.runWith({
            search_term: selectedOption.twitterSearchTerm,
            symbol: selectedOption.stockSymbol,
            from: this.from,
            to: this.to,
            type: 'number'
        }, 'getCorrelation2Index').subscribe((index: any) => {
            this.allMessagesCorrelation = index;
        });
        this.api.runWith({
            search_term: selectedOption.twitterSearchTerm,
            symbol: selectedOption.stockSymbol,
            from: this.from,
            to: this.to,
            type: 'positive'
        }, 'getCorrelation2Index').subscribe((index: any) => {
            this.positiveMessagesCorrelation = index;
        });
        this.api.runWith({
            search_term: selectedOption.twitterSearchTerm,
            symbol: selectedOption.stockSymbol,
            from: this.from,
            to: this.to,
            type: 'negative'
        }, 'getCorrelation2Index').subscribe((index: any) => {
            this.negativeMessagesCorrelation = index;
        });
    }

    basicChart() {
        const element = this.el.nativeElement;

        const trace1 = {
            type: 'scatter',
            name: 'stock close value',
            x: this.trase1.x,
            y: this.trase1.y,
            line: {color: '#e2c700'}
        };

        const trace2 = {
            type: 'scatter',
            name: 'neutral messages count',
            x: this.trase2.x,
            y: this.trase2.y,
            line: {color: '#00a7ff'},
            yaxis: 'y2'
        };

        const trace3 = {
            type: 'scatter',
            name: 'positive messages count',
            x: this.trase3.x,
            y: this.trase3.y,
            line: {color: '#00bc30'},
            yaxis: 'y2'
        };

        const trace4 = {
            type: 'scatter',
            name: 'negative messages count',
            x: this.trase4.x,
            y: this.trase4.y,
            line: {color: '#ff627a'},
            yaxis: 'y2'
        };

        const data = [trace1, trace2, trace3, trace4];

        const style = {
            title: this.selectedOption.twitterSearchTerm,
            yaxis: {title: 'stock data'},
            yaxis2: {
                overlaying: 'y',
                side: 'right'
            },
            yaxis3: {
                overlaying: 'y',
                side: 'right'
            },
            yaxis4: {
                overlaying: 'y',
                side: 'right'
            }
        };

        Plotly.newPlot(element, data, style);
    }
}
