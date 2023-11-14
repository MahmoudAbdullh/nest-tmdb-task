import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => UsersModule),
    forwardRef(() => MoviesModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
