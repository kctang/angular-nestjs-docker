import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { CatsModule } from './cats.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/tut-02'), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
