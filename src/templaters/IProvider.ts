export interface IProvider {
    html(template: string, variables: any): Promise<string>;
}
