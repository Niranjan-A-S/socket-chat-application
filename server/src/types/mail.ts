import { Content } from 'mailgen';

export interface ISendMailOptions {
    email: string;
    subject: string;
    mailgenContent: Content;
}
