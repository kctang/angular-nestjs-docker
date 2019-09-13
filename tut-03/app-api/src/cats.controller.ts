import { Controller, Get, Post, Body } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'
import {ConfigService} from './config.service'

@Controller('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService,
               private readonly configService: ConfigService) {
  }

  @Post()
  async create (@Body() createCatDto: CreateCatDto) {
    this.catsService.create({
      name: 'nobody',
      ...createCatDto
    })
  }

  @Get()
  async findAll (): Promise<Cat[]> {
    console.log(this.configService.get('key'))
    return this.catsService.findAll()
  }
}
