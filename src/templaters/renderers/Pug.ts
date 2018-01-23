import * as path from 'path';
import * as templater from 'pug';
import { IRenderer } from './IRenderer';

export interface IPugOptions {
    views: string;
}

export class Pug implements IRenderer {
    views: string;
    constructor(options: IPugOptions) {
        this.views = options.views
    }

    path(template) {
        return path.resolve(this.views, template);
    }

    render(template, options) {
        return new Promise<string>((resolve, reject) => {
            templater.renderFile(this.path(template), options, (err, html: string) => {
                if(err) reject(err);
                else resolve(html);
            })
        });
    }
}
