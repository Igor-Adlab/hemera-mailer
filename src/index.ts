import * as HP from 'hemera-plugin';
import * as Nodemailer from 'nodemailer';

import { HttpProvider } from './templaters/HttpProvider';
import {TOPIC_MAILER, CMD_SEND_MAIL} from "./constants";

export * from './constants';

export interface IRemoteOptions {
    url: string;
}

export interface ISendMailRequest {
    to: string;
    from: string;
    variables: any;
    transport?: any;
    remote: IRemoteOptions;
    subject: string;
    template: string;
    attachments?: Array<any>;
}

export const options = { name: 'hemera-mailer' };
export const plugin = HP((hemera, options: any, next: Function) => {
    const renderer = options.provider;
    const service = request => request.remote ? HttpProvider.create(request.remote) : renderer;

    const send = (html, request: ISendMailRequest) => {
        const transporter = Nodemailer.createTransport(request.transport || options.transport);
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                html,
                to: request.to,
                from: request.from,
                subject: request.subject,
                attachments: request.attachments || [],
            }, (err, info) => {
                if(err) reject(err);
                else resolve(info)
            })
        })
    };

    hemera.add({
        topic: TOPIC_MAILER,
        cmd: CMD_SEND_MAIL,
    }, (request: ISendMailRequest, cb) =>
            service(request)
                .html(request.template, request.variables)
                .then(html => send(html, request))
                .then(info => cb(null, info))
                .catch(err => cb(err, null))
    );

    next();
}, '>=2');
