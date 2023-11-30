import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { seedOrmConfig } from 'src/config/typeOrm.config';

import { User } from 'src/users/entities/user.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Gener } from 'src/geners/entities/gener.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Movie } from 'src/movies/entities/movie.entity';

import { SeedService } from './seed.service';
import { UsersSeeder } from './users.seeder';
import { GenersSeeder } from './geners.seeder';
import { MoviesSeeder } from './movies.seeder';
import { TmdbClient } from './tmdb.client';

@Module({
  imports: [
    TypeOrmModule.forRoot(seedOrmConfig),
    TypeOrmModule.forFeature([User, Favorite, Gener, Vote, Movie]),
  ],
  controllers: [],
  providers: [SeedService, UsersSeeder, GenersSeeder, MoviesSeeder, TmdbClient],
})
export class SeedModule {}
