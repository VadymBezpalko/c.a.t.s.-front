import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

    @ViewChild('chart') el: ElementRef;

    constructor() {
    }

    ngOnInit() {
        this.basicChart();
    }

    basicChart() {
        const element = this.el.nativeElement;
        const data = [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
        }];

        const style = {
            margin: {t: 0}
        };

        Plotly.plot(element, data, style);
    }
}
