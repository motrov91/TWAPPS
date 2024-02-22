import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachments?: Attachment[]; 
}

interface Attachment {
    filename: string,
    path: string
}

export class EmailService {

    constructor(){}

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async sendEmailWithFilesSystemLogs( to : string | string[] ){
        const subject = 'Logs del servidor';
        const htmlBody = `
            <H3>Logs del sistema - TWAPPS</H3>
            <p>lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            <p>Ver adjuntos</p>
        `;

        const attachments: Attachment[] = [
            {filename:'logs-all.log', path: './logs/logs-all.log'},
            {filename:'logs-high.log', path: './logs/logs-high.log'},
            {filename:'logs-medium.log', path: './logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}