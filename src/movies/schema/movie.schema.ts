import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  tmdb_id: number;

  @Prop()
  genre_ids: number[];

  @Prop()
  title: string;

  @Prop()
  overview: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
