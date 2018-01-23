import * as templater from 'nunjucks';
import { IRenderer } from './IRenderer';

export interface INunjucksOptions {
    views: string;
}

export class Nunjucks implements IRenderer {
    constructor(options: INunjucksOptions) {
        templater.configure(options.views);
    }

    render(template, options) {
        return new Promise<string>((resolve, reject) => {
            templater.render(template, options, (err, html: string) => {
                if(err) reject(err);
                else resolve(html);
            })
        });
    }
}
