import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(
      body.title,
      body.overview,
      body.tmdb_id,
      body.gener_ids,
    );
  }

  @Get('/votes')
  findAllVotes() {
    return this.movieService.findAllVotes();
  }

  @Post('/vote')
  createVote(@Body() body: CreateVoteDto) {
    return this.movieService.createVote(body.user_id, body.movie_id, body.vote);
  }
}
