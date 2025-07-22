//Ejemplo de como exportar un provider :
/*
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};


//Implementacion en un Modulo
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'], o  exports: [connectionFactory],
})
export class AppModule {}

*/
