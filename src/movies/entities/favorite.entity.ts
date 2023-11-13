import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { MovieEntity } from './movie.entity';

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;

  @OneToMany(() => MovieEntity, (user) => user.favorites)
  movie: MovieEntity;
}
