import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { MovieEntity } from './movie.entity';

@Entity('vote')
export class GenerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  user: UserEntity;

  @ManyToMany(() => MovieEntity, (movie) => movie.geners)
  movies: MovieEntity[];

  @Column()
  rate: number;
}
