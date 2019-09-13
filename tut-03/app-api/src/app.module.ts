import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {MongooseModule} from '@nestjs/mongoose'
import {CatsModule} from './cats.module'
import {ConfigModule} from './config.module'
import {ConfigService} from './config.service'

@Module({
    imports: [
        ConfigModule,
        // MongooseModule.forRoot('mongodb://localhost/tut-02'),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('mongoDbUrl')
            }),
            inject: [ConfigService]
        }),
        CatsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
