import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private repo: MoviesRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findOneBy(id: number) {
    return this.repo.findOneBy(id);
  }

  create(
    title: string,
    overview: string,
    tmdb_id: number,
    // genre_ids: number[],
  ) {
    return this.repo.create(title, overview, tmdb_id /**, genre_ids */);
  }

  // votes
  findAllVotes() {
    return this.repo.findAllVotes();
  }

  createVote(user_id: number, movie_id: number, vote: number) {
    return this.repo.createVote(user_id, movie_id, vote);
  }

  // fav
  addFavorite(user_id: number, movie_id: number) {
    return this.repo.addFavorite(user_id, movie_id);
  }
}
