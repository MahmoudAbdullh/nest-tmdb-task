import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MovieEntity } from './entities/movie.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { VoteEntity } from './entities/vote.entity';
import { UserEntity } from 'src/users/user.entity';
import { GenerEntity } from './entities/gener.entity';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(MovieEntity) private movieRepo: Repository<MovieEntity>,
    @InjectRepository(FavoriteEntity)
    private favoriteRepo: Repository<FavoriteEntity>,
    @InjectRepository(VoteEntity) private voteRepo: Repository<VoteEntity>,
    @InjectRepository(GenerEntity) private generRepo: Repository<GenerEntity>,
  ) {}

  findAll() {
    return this.movieRepo.find();
  }

  findOneBy(id: number): Promise<MovieEntity> {
    return this.movieRepo.findOneBy({ id });
  }

  create(
    title: string,
    overview: string,
    tmdb_id: number /*, geners: number[]*/,
  ) {
    // this.generRepo.find({});
    const movie = this.movieRepo.create({
      title,
      overview,
      tmdb_id,
      geners: [],
    });
    return this.movieRepo.save(movie);
  }

  // votes
  findAllVotes() {
    return this.voteRepo.find();
  }

  async findVoteBy(id: number) {
    await this.movieRepo.findOneBy({ id: id });
  }

  async createVote(user_id: number, movie_id: number, rate: number) {
    const user = await this.userRepo.findOneBy({ id: user_id });
    const movie = await this.findOneBy(movie_id);
    const voted = await this.voteRepo.findOne({ where: { user } });
    if (!!voted) return new BadRequestException('already voted');
    if (!user) return new NotFoundException('user not exist');
    if (!movie) return new NotFoundException('movie not exist');
    const newVote = this.voteRepo.create({
      user,
      movie,
      rate,
    });
    return this.voteRepo.save(newVote);
  }

  // fav
  async addFavorite(user_id: number, movie_id: number) {
    const user = await this.userRepo.findOneBy({ id: user_id });
    const movie = await this.findOneBy(movie_id);
    if (!user) return new NotFoundException('user not exist');
    if (!movie) return new NotFoundException('movie not exist');

    const newFav = this.favoriteRepo.create({ user, movie });
    return this.favoriteRepo.save(newFav);
  }
}
