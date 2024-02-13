//*Un caso de uso es un fragmento de codigo que se especializa en una unica tarea.

//* Las interfaces nos permiten organizar nuestra clase para que la gente sepa 
//* como funciona.S

interface CheckServiceUseCase {
    execute( url : string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCalback = ( error: string ) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
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

            this.successCallback();
            return true;

        } catch (error) {
            console.log(`${ error }`)
            this.errorCallback(`${ error }`)
            return false;
        }

    }
}