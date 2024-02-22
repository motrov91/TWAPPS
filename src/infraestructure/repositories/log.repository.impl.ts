import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository"


export class LogRepositoyImpl implements LogRepository{

    //Vamos a inyectar el LogDataSource
    constructor(
        private readonly logDatasource: LogDataSource
    ){}

    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLogs(severityLavel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs( severityLavel );
    }

}