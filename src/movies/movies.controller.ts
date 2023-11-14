import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('gener_id') gener_id: number,
    @Query('search') search: string,
  ) {
    const filter = { page, limit, gener_id, search };
    return this.movieService.findAll(filter);
  }

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Get('/favorites')
  getFavorites(@Query('user_id') userId: string) {
    return this.movieService.getFavorites(+userId);
  }

  @Post('/add-favorite')
  addFavorite(@Body() body: CreateFavoriteDto) {
    return this.movieService.addFavorite(body);
  }
}
