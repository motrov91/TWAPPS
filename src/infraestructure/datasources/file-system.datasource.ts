import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatassource implements LogDataSource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {

        //* Verifica si existe el archivo logPath y en caso de no encontrarlo
        //* lo crea.
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync( this.logPath );
        }

        /*
            * Creamos un arreglo en donde insertamos las rutas de los logs
            * lo recorremos con un foreach en caso de que el path exista
            * con writeFileSync se le pasa el path y se crea el archivo
        */

        [
            this.allLogsPath,
            this.mediumLogPath,
            this.highLogPath,
        ].forEach( path => {
            if( fs.existsSync( path )) return;

            fs.writeFileSync(path, '');
        })
    };


    // Implementa la funcion que viene desde desde la clase abstracta LogDataSource
    async saveLog(newLog: LogEntity): Promise<void> {
        
        //stringify toma un objeto y lo serializa como un JSON.
        const logAsJson = `${ JSON.stringify(newLog) }\n`

        // Agrega el log como unna nueva linea al archivo all logs
        // apendFielSync agrega una linea sin eliminar las demas del archivo
        fs.appendFileSync( this.allLogsPath, logAsJson );

        // si el level del log es bajo no hacemos nada.
        if( newLog.level === LogSeverityLevel.low ) return;
        
        // si el level es medium lo agregamos al archivo de log medium.
        if( newLog.level === LogSeverityLevel.medium ){
            fs.appendFileSync( this.mediumLogPath, logAsJson );
        }else{
            fs.appendFileSync( this.highLogPath, logAsJson )
        }
    }

    //Creamos una funcion privada para obtener los LogEntity y retornarlos
    //a esta funcion debemos pasarle el path y va a retornar un arreglo de LogEntity 
    private getLogsFromFile = ( path: string ): LogEntity[] => {
        //leemos el archivo con readFielSync le pasamos la ruta y el formato en este caso utf-8
        const content = fs.readFileSync( path, 'utf-8' );
        //Con el metodo split dividimos el archivo y lo recorremos para retornar
        //con la ayuda de fromJson que es un metodo de LogEntity los logs serializados
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLogs(severityLavel: LogSeverityLevel): Promise<LogEntity[]> {
       
        switch( severityLavel ){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogPath);
            default:
                throw new Error(`${ severityLavel } not implemented`)
        }
    }


}