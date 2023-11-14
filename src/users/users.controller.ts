import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/favorites')
  async getWatchList(id: number) {
    return this.userService.getWatchList(id);
  }

  @Post()
  addUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}
