import * as nunjucks from 'nunjucks';
import { IRenderer } from './IRenderer';

export interface INunjucksOptions {
    env?: any;
    views?: string;
}

export class Nunjucks implements IRenderer {
    public renderer;
    constructor(options: INunjucksOptions) {
        this.renderer = options.env || new nunjucks.Environment(new nunjucks.FileSystemLoader(options.views));
    }

    render(template, options) {
        return new Promise<string>((resolve, reject) => {
            this.renderer.render(template, options, (err, html: string) => {
                if(err) reject(err);
                else resolve(html);
            })
        });
    }
}
