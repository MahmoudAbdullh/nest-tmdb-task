import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';

import { IMovie, SeederInterface } from './seeder.interface';
import { Movie } from 'src/movies/entities/movie.entity';
import { Gener } from 'src/geners/entities/gener.entity';
import { TmdbClient } from './tmdb.client';

@Injectable()
export class MoviesSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Gener)
    private readonly generRepository: Repository<Gener>,
    private readonly tmdbClient: TmdbClient,
  ) {}

  async seed() {
    const movies: IMovie[] = await this.tmdbClient.loadMovies();

    await Bluebird.each(movies, async (movie: IMovie) => {
      // get geners
      const geners = await this.generRepository.find({
        where: { tmdb_id: In(movie.genre_ids) },
      });
      // save
      const newMovie = this.movieRepository.create({
        tmdb_id: movie.id,
        title: movie.title,
        overview: movie.overview,
      });
      newMovie.geners = geners;
      await this.movieRepository.save(newMovie);
    });
  }
}
