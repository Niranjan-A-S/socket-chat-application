import { Request } from 'express';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { FROM_MAIL, MAILGEN_LINK, MAILGEN_NAME, MAILGEN_THEME } from '../constants/mail';
import { Messages } from '../constants/messages';
import { ISendMailOptions } from '../types/mail';

export const getMailGenerator = () => new Mailgen({
    product: {
        link: MAILGEN_LINK,
        name: MAILGEN_NAME
    },
    theme: MAILGEN_THEME
});

export const getSMTPCredentials = () => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASS;

    if (!(smtpHost || smtpPassword || smtpUser)) throw new Error(Messages.FAILED_TO_SEND_MAIL);

    return { smtpHost, smtpPassword, smtpUser };
};

export const sendMail = async ({ email, mailgenContent, subject }: ISendMailOptions) => {
    try {
        const mailGenerator = getMailGenerator();

        const textualEmail = mailGenerator.generatePlaintext(mailgenContent);
        const htmlEmail = mailGenerator.generate(mailgenContent);

        const { smtpHost, smtpPassword, smtpUser } = getSMTPCredentials();
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            auth: {
                user: smtpUser,
                pass: smtpPassword
            }
        } as SMTPTransport.Options);

        const mail = {
            from: FROM_MAIL,
            to: email,
            subject,
            text: textualEmail,
            html: htmlEmail
        };
        await transporter.sendMail(mail);
    } catch (error) {
        console.log('Error: ', error);
    }
};

export const emailVerificationMailgenContent = (username: string, verificationUrl: string) => ({
    body: {
        name: username,
        intro: 'Welcome to our app! We\'re very excited to have you on board.',
        action: {
            instructions:
                'To verify your email please click on the following button:',
            button: {
                color: '#e586e5',
                text: 'Verify your email',
                link: verificationUrl
            }
        },
        outro:
            'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
});

export const getVerificationUrl = (req: Request, token: string) => `${req.protocol}://${req.get('host')}/auth/verify-email/${token}`;
