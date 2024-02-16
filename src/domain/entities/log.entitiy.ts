export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}


export class LogEntity{

    public level : LogSeverityLevel ;
    public message : string;
    public createdAt : Date;

    constructor(message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    //Creando el metodo estatico nos evitamos crear una instancia para usarlo.
    static fromJson = ( json: string): LogEntity => {
        //Parcea el json que recibe y desestructuramos los elementos del mismo
        const { message, level, createdAt } = JSON.parse(json);

        //Crea una instancia de LogEntity y pasamos el mensaje y el nivel
        const log = new LogEntity(message, level);
        //la fecha la parseamos al final porque sino pasa la fecha en la que llamamos el archivo
        log.createdAt = new Date(createdAt);

        return log;

    }

}