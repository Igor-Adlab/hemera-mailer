import * as url from 'url-join';
import * as fetch from 'node-fetch';
import { IProvider } from './IProvider';

export interface IHttpProviderOptions {
    url: string;
}

export class HttpProvider implements IProvider {
    url: string;

    static create(options: IHttpProviderOptions) {
        return new HttpProvider(options);
    }

    constructor(options: IHttpProviderOptions) {
        this.url = options.url;
    }

    private path(template) {
        return url(this.url, template)
    }

    public html(template: string, options: any): Promise<string> {
        return fetch(this.path(template), { method: 'post', body: options })
            .then(res => res.text());
    }
}
