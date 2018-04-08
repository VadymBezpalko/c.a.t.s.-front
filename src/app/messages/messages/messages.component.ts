import { Component } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
    from = '2018-03-01';
    to = '2018-04-06';
    symbol = 'bzwbk';
    searchSymbols = [
        'bzwbk',
        'orlen',
        'orange polska',
        'pkp cargo',
        'cd project red',
        'budimex',
    ];
    messages: any;
    dataColumns = [
        {name: 'Text', prop: 'text'},
        {name: 'Translated term', prop: 'translated_text'},
        {name: 'Retweet count', prop: 'retweet_count'},
        {name: 'Created at', prop: 'created_at'},
    ];

    constructor(private api: ApiService) {
    }

    getMessages() {
        this.api.run('getTwitterMessages', {
            search_term: this.symbol,
            from: this.from,
            to: this.to
        }).subscribe(messages => {
            this.messages = messages;
        });
    }

}
