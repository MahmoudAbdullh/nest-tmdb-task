import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FavoriteEntity } from 'src/movies/entities/favorite.entity';
import { GenerEntity } from 'src/movies/entities/gener.entity';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { VoteEntity } from 'src/movies/entities/vote.entity';
import { UserEntity } from 'src/users/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'movies_tmdb',
  entities: [UserEntity, MovieEntity, FavoriteEntity, VoteEntity, GenerEntity],
  synchronize: true,
};
