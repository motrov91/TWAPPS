//*Un caso de uso es un fragmento de codigo que se especializa en una unica tarea.

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

//* Las interfaces nos permiten organizar nuestra clase para que la gente sepa 
//* como funciona.S

interface CheckServiceUseCase {
    execute( url : string ): Promise<boolean>;
}

//* Declarar elementos que pueden retornar un valor o nulo
type SuccessCallback = (() => void) | undefined;
type ErrorCalback = (( error: string ) => void ) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCalback
    ){}

    
    //*excecute es todo lo que quiero que tenga mi caso de uso
    //*recibe una url y retorna una promesa de tipo booleano
    public async execute( url: string): Promise<boolean>{

        try {

            const req = await fetch(url);
            if( !req.ok ){
                //throw dispara el catch
                throw new Error(`Error on check service ${ url }`);
            }

            let options = {
                level : LogSeverityLevel.low,
                message: `Service ${ url } working`,
                origin: 'check-service.ts'
            }

            const log = new LogEntity(options);
            this.logRepository.saveLog( log );
            this.successCallback ? this.successCallback() : undefined;
            return true;

        } catch (error) {
            let options = {
                level : LogSeverityLevel.high,
                message: `Service ${ url } working`,
                origin: 'check-service.ts'
            }
            const errorMessage = `Error in ${ url } - ${ error }`;
            const log = new LogEntity(options);
            this.logRepository.saveLog(log);
            this.errorCallback ? this.errorCallback(errorMessage) : undefined;
            return false;
        }

    }
}