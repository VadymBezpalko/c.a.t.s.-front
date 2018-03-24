import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnChanges {
    @ViewChild('chart') el: ElementRef;
    @Input() stockData: any;
    @Input() twitterData: any;
    x: any;
    x2: any;
    y: any;
    y2: any;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.renderChart();
    }

    ngOnChanges(changes) {
        console.log(changes);
        this.renderChart();
    }

    renderChart() {
        this.x = [];
        this.x2 = [];
        this.y = [];
        this.y2 = [];
        this.stockData.forEach((item) => {
            this.x.push(item.date);
            this.y.push(item.close);
        });
        this.twitterData.forEach((item) => {
            this.x2.push(item.created_at);
            this.y2.push(item.summary_sentimental);
        });
        this.basicChart();
    }

    basicChart() {
        const element = this.el.nativeElement;

        const trace1 = {
            type: 'scatter',
            mode: 'lines',
            name: 'BZWBK close value',
            x: this.x,
            y: this.y,
            line: {color: '#02ae10'}
        };

        const trace2 = {
            type: 'scatter',
            mode: 'lines',
            name: 'BZWBK twitter mood',
            x: this.x2,
            y: this.y2,
            line: {color: '#ff0043'},
            yaxis: 'y2'
        };

        const data = [trace1, trace2];

        const style = {
            title: 'Test data',
            yaxis: {title: 'BZWBK stock data'},
            yaxis2: {
                title: 'BZWBK twitter mood',
                titlefont: {color: 'rgb(148, 103, 189)'},
                tickfont: {color: 'rgb(148, 103, 189)'},
                overlaying: 'y',
                side: 'right'
            }
        };

        Plotly.newPlot(element, data, style);
    }
}
