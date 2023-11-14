import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity('vote')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.votes)
  @JoinColumn()
  movie: Movie;

  @Column()
  rate: number;
}
