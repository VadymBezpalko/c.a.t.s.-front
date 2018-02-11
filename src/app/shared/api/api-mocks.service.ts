import { Observable } from 'rxjs/Observable';
import { ApiAction } from './api-action.interface';

export class ApiMocksService {

    mocks = {
        'checkToken': ['admin'],
        'login': {
            bearer: 'XXX',
            role: ['admin']
        },
        'getContests': {
            data: [
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66804',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66309',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?63304',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66301',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66204',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?663654',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66384',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?64304',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66504',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                },
                {
                    logo: 'https://lorempixel.com/200/200/technics/?66704',
                    name: 'No api mock contest name',
                    description: 'No api mock contest description',
                    participantCount: 345,
                    startedAt: 1505554420,
                    endedAt: 1505554420,
                    prize: 555555,
                }
            ],
            lastPage: 5
        }
    };

    mock(action: ApiAction, data): Observable<object> {
        console.warn('Mocking: ', action);
        return Observable.of(this.mocks[action.action]);
    }
}