import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Gener } from 'src/geners/entities/gener.entity';
import { Vote } from 'src/votes/entities/vote.entity';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdb_id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @ManyToMany(() => Gener, (gener) => gener.movies)
  @JoinTable()
  geners: Gener[];

  @OneToMany(() => Vote, (vote) => vote.movie)
  votes: Vote[];

  @ManyToOne(() => Favorite, (fav) => fav.movies)
  @JoinColumn()
  favorite: Favorite;
}
