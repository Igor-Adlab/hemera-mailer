export interface IRenderer {
    render(template: string, variables: any): Promise<string>;
}
