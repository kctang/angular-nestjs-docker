import {Module} from '@nestjs/common'
import {CatsController} from './cats.controller'
import {CatsService} from './cats.service'
import {MongooseModule} from '@nestjs/mongoose'
import {CatSchema} from './schemas/cat.schema'
import {ConfigModule} from './config.module'

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Cat', schema: CatSchema}]),
        ConfigModule
    ],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {
}
