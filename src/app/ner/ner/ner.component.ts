import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';

@Component({
    selector: 'app-ner',
    templateUrl: './ner.component.html',
    styleUrls: ['./ner.component.scss']
})
export class NerComponent implements OnInit {
    selectedOption: any;
    options = [
        {search_term: 'bzwbk'},
        {search_term: 'orlen'},
        {search_term: 'orange polska'},
        {search_term: 'pkp cargo'},
        {search_term: 'cd project red'},
        {search_term: 'budimex'},
    ];
    NERDataColumns = [
        {name: 'Text', prop: 'text'},
        {name: 'Search term', prop: 'search_term'},
        {name: 'Positive quantity', prop: 'pos_quantity'},
        {name: 'Negative quantity', prop: 'neg_quantity'},
    ];
    NERDataRows: any;
    loadingIndicator = false;
    reorderable = true;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.selectedOption = this.options[0];
        this.getNERData(this.selectedOption);
    }

    getNERData(selectedOption) {
        this.loadingIndicator = true;
        this.selectedOption = selectedOption;
        this.api.run('getNERData', {
            search_term: selectedOption.search_term,
        }).subscribe(data => {
            this.NERDataRows = data;
            this.loadingIndicator = false;
            console.log(data);
        });
    }

}
