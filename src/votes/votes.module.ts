import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VotesController } from './votes.controller';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';
import { UsersModule } from 'src/users/users.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), UsersModule, MoviesModule],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [TypeOrmModule, VotesService],
})
export class VotesModule {}
