export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level : LogSeverityLevel ;
    message : string;
    createdAt? : Date;
    origin : string;
}

//La class LogEntity
export class LogEntity{

    public level : LogSeverityLevel ;
    public message : string;
    public createdAt : Date;
    public origin : string;

    constructor(options: LogEntityOptions){
        const {level, message, createdAt = new Date(), origin} = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    //Creando el metodo estatico nos evitamos crear una instancia para usarlo.
    static fromJson = ( json: string): LogEntity => {
        //Parcea el json que recibe y desestructuramos los elementos del mismo
        const { message, level, createdAt, origin } = JSON.parse(json);

        //Crea una instancia de LogEntity y pasamos el mensaje y el nivel
        const log = new LogEntity({
            message, 
            level,
            createdAt,
            origin
        });

        return log;

    }

}