import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatassource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoyImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoyImpl(
    new FileSystemDatassource()
);

export class Server{

    public static start(){
        console.log('Server started...')

        //Enviar Email
        const emailService = new EmailService();
        //* Envio de mensajes sin archivos adjuntos
        // emailService.sendEmail({
        //     to: 'manuel.ramirez1209@gmail.com',
        //     subject: 'Logs del sistema',
        //     htmlBody: `
        //         <H3>Logs del sistema - TWAPPS</H3>
        //         <p>lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        //     `
        // })

        //* Envio de mensajes con archivos adjuntos
        //emailService.sendEmailWithFilesSystemLogs('manuel.ramirez1209@gmail.com')

        //*Envio de mensajes desde el caso de uso 
        // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
        //     'manuel.ramirez1209@gmail.com'
        // )


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com.co';
        //         //const url = 'https://localhost:3000';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log( `${ url } SUCCESS` ),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // );
        
    }
}