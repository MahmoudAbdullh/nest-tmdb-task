import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Movie } from './movie.schema';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema()
export class Favorite {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] })
  movie_id: Movie[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
