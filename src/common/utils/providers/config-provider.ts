/*
const configProvider = {
    
    provide: ConfigService ,  //Crear implementacion de ConfigService 
    useClass: process.env.NODE_ENV === 'development' 
    ? DevelopmentConfigService  //Crear implementacion de DevelopmentConfigService
    : ProductionConfigService  //Crear implementacion de ProductionConfigService
    
}

export default configProvider ; 
*/

//Si necesitas implementarlo en tu module puedes hacerlo de esta manera:
/*
@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
*/
