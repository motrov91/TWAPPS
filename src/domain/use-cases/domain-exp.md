Domain lo podemos ver como todo lo que rige su dominio de la 
empresa.

estructura de carpetas:
domain => Reglas de negocio
    - datasource (contiene los origenes de datos -pogrest, mongo fileSystem - es decir de donde vamos a tomar los datos, solo colocamos las reglas para indicar como queremos que nuestro origen de datos funcione)
    - repository ( Como vamos a mandar a llamar nuestro datasource nunca llegamos directamente al datasouce, lo hacemos por medio de un repositorio )
    - entities (Algo que va a terminar llegando a la bd - Mapea como se vera nuestra entidad en base de datos -)
    - use-cases ( //*Es un fragmento de codigo que se especializa en una unica tarea )