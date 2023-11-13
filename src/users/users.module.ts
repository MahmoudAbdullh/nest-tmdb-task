import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { FavoriteEntity } from 'src/movies/entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FavoriteEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
