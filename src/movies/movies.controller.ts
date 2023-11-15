import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

import { CreateMovieDto } from './dto/create-movie.dto';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';
import { FindMoviesFilter } from './dto/find-movies-filter.dto';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll(@Query() query: FindMoviesFilter) {
    return this.movieService.findAll(query);
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
