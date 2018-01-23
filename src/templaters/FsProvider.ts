import { IProvider } from './IProvider';
import { IRenderer } from "./renderers/IRenderer";

export interface IFsProviderOptions {
    renderer: IRenderer;
}

export class FsProvider implements IProvider {
    renderer: IRenderer;

    constructor(options: IFsProviderOptions) {
        this.renderer = options.renderer;
    }

    public html(template: string, options: any): Promise<string> {
        return this.renderer.render(template, options);
    }
}
