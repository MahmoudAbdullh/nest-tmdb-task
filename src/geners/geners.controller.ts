import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GenersService } from './geners.service';
import { CreateGenerDto } from './dto/create-gener.dto';

@Controller('geners')
export class GenersController {
  constructor(private readonly genersService: GenersService) {}

  @Post()
  create(@Body() createGenerDto: CreateGenerDto) {
    return this.genersService.create(createGenerDto);
  }

  @Get()
  findAll() {
    return this.genersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genersService.remove(+id);
  }
}
