import { Movie } from 'src/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gener')
export class Gener {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tmdb_id: number;

  @ManyToMany(() => Movie, (movie) => movie.geners)
  movies: Movie[];
}
