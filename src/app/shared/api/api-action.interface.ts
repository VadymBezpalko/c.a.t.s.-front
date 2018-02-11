export interface ApiAction {
    action: string;
    method: string;
    url: string;
    params?: any;

    parseResponse?(response: any): any;
    parseErrorResponse?(response: any): any;
    parseRequest?(response: any): any;
}
