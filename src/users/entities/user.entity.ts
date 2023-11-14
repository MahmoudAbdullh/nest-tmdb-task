import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToOne(() => Favorite)
  favorite: Favorite;
}
