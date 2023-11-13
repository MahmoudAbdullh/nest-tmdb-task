import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { MovieEntity } from './movie.entity';

@Entity('vote')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.votes)
  movie: MovieEntity;

  @Column()
  rate: number;
}
