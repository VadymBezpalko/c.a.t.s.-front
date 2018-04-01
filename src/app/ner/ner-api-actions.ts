import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { ApiAction } from '../shared/api/api-action.interface';


export class NerApiActions implements ApiActionContainer {
    actions: ApiAction[] = [
        {
            action: 'getNERData', method: 'GET', url: 'named_entity'
        }
    ];
}
