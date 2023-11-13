import { FavoriteEntity } from 'src/movies/entities/favorite.entity';
import { VoteEntity } from 'src/movies/entities/vote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @OneToMany(() => VoteEntity, (vote) => vote.user)
  votes: VoteEntity[];

  @OneToMany(() => FavoriteEntity, (fav) => fav.user)
  favorites: FavoriteEntity[];
}
