import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VoteEntity } from './vote.entity';
import { FavoriteEntity } from './favorite.entity';
import { GenerEntity } from './gener.entity';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdb_id: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @ManyToMany(() => GenerEntity, (gener) => gener.movies)
  geners: GenerEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.movie)
  votes: VoteEntity[];

  @ManyToOne(() => FavoriteEntity, (fav) => fav.movie)
  favorites: FavoriteEntity[];
}
