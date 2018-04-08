import { ApiActionContainer } from '../shared/api/api-action-container.interface';
import { ApiAction } from '../shared/api/api-action.interface';


export class MessagesApiActions implements ApiActionContainer {
    actions: ApiAction[] = [
        {
            action: 'getTwitterMessages', method: 'GET', url: 'twitter/messages'
        }
    ];
}
