import type {EmailTemplate} from './types/EmailTypes'
//@ts-ignore
import nodemailer from 'nodemailer';
// @ts-ignore
import { useRuntimeConfig } from '#imports';

export async function sendEmail(to: string, subject: string, template: EmailTemplate) {
    const config = useRuntimeConfig();
    const transporter = nodemailer.createTransport({
        host: config.mailerHost,
        port: config.mailerPort,
        secure: true,
        auth: {
            user: config.mailerUser,
            pass: config.mailerPass
        }
    });

    const mailOptions = {
        from: 'hello@creatormate.com',
        to: to,
        subject: subject,
        html: template.html,
        text: template.text
    }

    const info = await transporter.sendMail(mailOptions);
}