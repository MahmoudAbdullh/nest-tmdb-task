import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from './schema/movie.schema';
import { Favorite } from './schema/favorite.schema';
import { Vote } from './schema/vote.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(Favorite.name) private favModel: Model<Favorite>,
    @InjectModel(Vote.name) private voteModel: Model<Vote>,
  ) {}

  findAll() {
    return this.movieModel.find().exec();
  }

  findBy(id: string) {
    return this.movieModel.findById(id);
  }

  create(
    title: string,
    overview: string,
    tmdb_id: number,
    genre_ids: number[],
  ) {
    const movie = new this.movieModel({ title, overview, tmdb_id, genre_ids });
    return movie.save();
  }

  // votes
  findAllVotes() {
    return this.voteModel
      .aggregate([
        {
          $lookup: {
            from: Movie.name,
            localField: 'id',
            foreignField: 'user_id',
            as: 'user',
          },
        },
      ])
      .exec();
  }

  createVote(user_id: string, movie_id: string, vote: number) {
    const newVote = new this.voteModel({ user_id, movie_id, vote });
    return newVote.save();
  }
}
