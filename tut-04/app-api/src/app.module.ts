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
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    useNewUrlParser: true,
                    uri: configService.get('mongodb_url'),
                    user: configService.get('mongodb_user'),
                    pass: configService.get('mongodb_pass')
                }
            },
            inject: [ConfigService]
        }),
        CatsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
