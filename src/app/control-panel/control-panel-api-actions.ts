import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { ApiAction } from '../shared/api/api-action.interface';


export class NerApiActions implements ApiActionContainer {
    actions: ApiAction[] = [
        {
            action: 'fetchStockData', method: 'POST', url: 'stock/fetch/'
        },
        {
            action: 'makeSentimentAnalysis', method: 'GET', url: 'twitter/sentiment_analysis'
        },
        {
            action: 'makeNER', method: 'GET', url: 'named_entity/process'
        }
    ];
}
