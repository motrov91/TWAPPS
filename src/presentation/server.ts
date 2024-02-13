import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service"

export class Server{

    public static start(){
        console.log('Server started...')

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com.co';
                new CheckService(
                    () => console.log( `${ url } SUCCESS` ),
                    ( error ) => console.log( error ),
                ).execute( url );
                // new CheckService().execute( 'http://localhost:3000' );

            }
        );
        
    }
}