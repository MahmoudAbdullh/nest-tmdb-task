import { Injectable } from '@nestjs/common';
import { IGener } from './seeder.interface';
@Injectable()
export class TmdbClient {
  private baseUrl: string;
  private options: {
    method: string;
    headers: {
      accept: string;
      Authorization: string;
    };
  };

  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };
  }

  async loadGeners() {
    const geners = await fetch(
      `${this.baseUrl}/genre/movie/list?language=en`,
      this.options,
    )
      .then((res) => res.json())
      .then((json) => json.genres || [])
      .then((geners: IGener[]) =>
        geners.map((gener) => ({ tmdb_id: gener.id, name: gener.name })),
      )
      .catch((err) => console.error('error:' + err));

    return geners || [];
  }

  async loadMovies(page = 1) {
    const movies = await fetch(
      `${this.baseUrl}/movie/popular?language=en-US&page=${page}`,
      this.options,
    )
      .then((res) => res.json())
      .then((json) => json.results || [])
      .catch((err) => console.error('error:' + err));

    return movies;
  }
}
