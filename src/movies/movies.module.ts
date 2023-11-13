import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { VoteEntity } from './entities/vote.entity';
import { UsersModule } from 'src/users/users.module';
import { MoviesRepository } from './movies.repository';
import { GenerEntity } from './entities/gener.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieEntity,
      FavoriteEntity,
      VoteEntity,
      GenerEntity,
    ]),
    UsersModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
