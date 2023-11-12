import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Movie } from './movie.schema';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movie_id: Movie;

  @Prop({ min: 0, max: 10 })
  vote: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
