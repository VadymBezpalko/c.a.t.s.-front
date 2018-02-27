import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { ApiAction } from '../shared/api/api-action.interface';


export class ChartsApiActions implements ApiActionContainer {
    actions: ApiAction[] = [
        {
            action: 'getStockData', method: 'GET', url: 'stock'
        },
        {
            action: 'getTwitterData', method: 'GET', url: 'twitter'
        }
    ];
}
