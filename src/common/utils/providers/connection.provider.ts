/*
//Codigo de ejemplo para crear proveedores dinamicamente
const connectionProvider = { 
    provider: 'CONNECTION' , 
    useFactory : (optionalProvider : MyOptionalProvider , optionalProvider? : string) => {
        const options = optionalProvider.get() ; 
        return new DatabaseConnection(options) ; 
    }, 
     inject: [MyOptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \______________/             \__________________/
  //        This provider                The provider with this token
  //        is mandatory.                can resolve to `undefined`.
}

//AConexion asincrona a la base de datos 
{        ///Esto es para usar en el module por lo que veo 
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
}

/*
Implementacion del useFactory para los providers 
@Module({
  providers: [
    connectionProvider,
    MyOptionsProvider, // class-based provider
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
*/
