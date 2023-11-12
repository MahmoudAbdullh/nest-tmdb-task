import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from './schema/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from './schema/vote.schema';
import { Favorite, FavoriteSchema } from './schema/favorite.schema';
import { TmdbClientService } from './services/tmdb-client.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
  providers: [MoviesService, TmdbClientService],
  controllers: [MoviesController],
})
export class MoviesModule {}
