import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import 'rxjs/Rx';
import { FormGroup } from '@angular/forms';
import { ValidationService } from '../validation/validation.service';
import { Observable } from 'rxjs/Observable';
import { ApiAction } from './api-action.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
    apiUrl = environment.apiUrl;

    constructor(
        private httpClient: HttpClient,
        private validationService: ValidationService) {
    }

    private actions: ApiAction[] = [];

    provideActions(actions: ApiAction[]) {
        this.actions = this.actions.concat(actions);
    }

    run(actionName: string, params?: any) {
        return this.runWith({}, actionName, params);
    }

    runWith(toSend: any, actionName: string, params?: any) {
        let data = toSend instanceof FormGroup ? toSend.value : toSend;
        let action: any = this.getAction(actionName);

        if (action.params) {
            if (!params) {
                params = {
                    ...action.params
                };
            } else {
                params = {
                    ...action.params,
                    ...params
                };
            }
        }

        if (params) {
            action = {
                ...action,
                url: this.interpolateUrl(action.url, params)
            };
        }

        let request: Observable<object> = null;

        if (action.parseRequest) {
            data = action.parseRequest(data);
        }

        let headers = new HttpHeaders();

        if (data instanceof FormData) {
            headers = new HttpHeaders({});
        }

        switch (action.method) {
            case 'POST':
                request = this.httpClient.post(this.apiUrl + action.url, data, {
                    params: this.createHttpParams(params),
                    headers: headers
                });
                break;
            case 'GET':
                request = this.httpClient.get(this.apiUrl + action.url, {
                    params: this.createHttpParams(params)
                });
                break;
            case 'PUT':
                request = this.httpClient.put(this.apiUrl + action.url, data, {
                    params: this.createHttpParams(params),
                    headers: headers
                });
                break;
            case 'DELETE':
                request = this.httpClient.delete(this.apiUrl + action.url, {
                    params: this.createHttpParams(params)
                });
                break;
        }

        if (action.parseResponse) {
            request = request.map(action.parseResponse);
        }

        if (action.parseErrorResponse) {
            request = request.catch(errorResponse => {
                throw action.parseErrorResponse(errorResponse);
            });
        }

        if (toSend instanceof FormGroup) {
            request = request.catch(errorResponse => {
                if (errorResponse.error && errorResponse.error.errors) {
                    this.validationService.bindErrors(errorResponse.error.errors, toSend);
                }
                throw errorResponse;
            });
        }

        return request;
    }

    private getAction(action: string) {
        for (const item of this.actions) {
            if (item.action === action) {
                return item;
            }
        }

        throw Error('ApiAction ' + action + ' doesnt exists');
    }

    private interpolateUrl(url, params) {
        Object.keys(params).map(param => {
            url = url.replace(':' + param, params[param]);
        });

        return url;
    }

    private createHttpParams(params) {
        let httpParams = new HttpParams();

        if (params) {
            Object.keys(params).forEach(function (key) {
                httpParams = httpParams.append(key, params[key]);
            });
        }

        return httpParams;
    }
}
